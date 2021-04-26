import dayjs from 'dayjs';
import { round } from '../../Utils/Common';
import { DATE_FORMAT } from '../../Constant/EnvConstants';

const getXAxis = (interval) => {
  const date = dayjs();
  const pad = (x) => {
    return String(x).padStart(2, '0');
  };
  /*
  Since initialization of this way,
  the array will become [0,1,2,3 ... ]
  However, 2-length string is needed for date display.
  Therefore, pad() is needed to transform the item in array to
  2-length string, like:
  ['00','01','02','03' ...]
  */
  let xAxis = [...Array(24).keys()].map(pad);

  switch (interval) {
    case 'hour':
      return xAxis.map((x) => date.format(DATE_FORMAT).concat(` ${x}:00`));
    case 'day':
      xAxis = [...Array(date.daysInMonth()).keys()]
        .map((x) => {
          return x + 1;
        })
        .map(pad);
      return xAxis.map((x) => date.format('YYYY-MM-').concat(x));
    default:
      return xAxis;
  }
};

const getUsageDataSeries = (data, callback) =>
  data
    ? Object.values(data)
        .map(callback)
        .map((x) => round(x, 3))
    : [];

const getTempDataSeries = (data) => (data ? data.map((x) => round(x, 2)) : []);

const getOptions = (usageConfig, usageData, tempData, interval) => {
  return {
    title: {
      text: usageConfig.name,
      padding: 2,
      textStyle: {
        color: '#404040',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: usageConfig.color,
      padding: [5, 10],
      textStyle: {
        color: '#FFFFFF',
      },
      borderRadius: 5,
      formatter: `{b0} </br> {a0}:&nbsp{c0} ${usageConfig.unit} </br> {a1}:&nbsp{c1} °C`,
    },
    legend: {
      data: ['Usage', 'Temperature'],
      textStyle: {
        color: '#404040',
      },
      right: 25,
    },
    toolbox: {
      iconStyle: {
        borderColor: '#404040',
      },
      feature: {
        dataView: {
          title: 'Data View',
          show: true,
          lang: ['Data View', 'Close', 'Refresh'],
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        show: false,
        data: getXAxis(interval),
        axisPointer: {
          type: 'none',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: `${usageConfig.unit}`,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#404040',
          },
        },
        axisTick: {
          show: false,
        },
      },
      {
        type: 'value',
        name: 'Temp.',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#404040',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: '{value} °C',
        },
      },
    ],
    series: [
      {
        name: `Usage`,
        type: 'bar',
        itemStyle: {
          color: usageConfig.barColor,
        },
        data: getUsageDataSeries(usageData, usageConfig.process),
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'none',
        color: '#909090',
        data: getTempDataSeries(tempData),
      },
    ],
  };
};

export default getOptions;
