import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import MeterConstants from '../../Constant/MeterConstants';
import getOptions from './ChartConfig';

function UsageChart({
  name,
  usageData: { interval, data: usageData },
  tempData,
}) {
  const usageConfig = MeterConstants[name];
  const option = getOptions(
    usageConfig,
    usageData[usageConfig.type],
    tempData,
    interval,
  );
  const onChartReady = (input) => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_t"] }] */
    const chart = input;
    chart._t = setTimeout(() => {
      chart.hideLoading();
    }, 2000);
  };

  const getLoadingOption = () => {
    return {
      text: 'Loading...',
      color: '#377781',
      textColor: '#377781',
      maskColor: 'rgba(225, 249, 251, 0.3)',
      zlevel: 0,
    };
  };

  const onEvents = {
    finished: (_, chart) => {
      onChartReady(chart);
    },
  };

  return (
    <ReactEcharts
      className="my-4"
      option={option}
      onChartReady={onChartReady}
      loadingOption={getLoadingOption()}
      onEvents={onEvents}
      showLoading
    />
  );
}

UsageChart.defaultProps = {
  name: 'power',
  usageData: {},
  tempData: [],
};

UsageChart.propTypes = {
  name: PropTypes.string,
  usageData: PropTypes.instanceOf(Object),
  tempData: PropTypes.instanceOf(Array),
};

export default UsageChart;
