import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Flex } from '@chakra-ui/core';
import UsageChart from './UsageChart';
import { useAxiosEffect } from '../../Hooks/AxiosEffect';
import { LOCATION } from '../../Constant/EnvConstants';
import rangeProp from '../../Constant/StatisticsConstants';
import AppSpinner from '../Common/Spinner';
import {
  getStartEndDate,
  parseTempData,
  aggregateTempData,
  alignStartEndDate,
} from '../../Utils/Common';

function UsageGroup({ range }) {
  let [start, end] = getStartEndDate(range);
  let tempData = null;
  const { interval } = rangeProp[range];
  const quantity =
    range === rangeProp.Monthly.name ? dayjs().daysInMonth() : 24;
  const usageConfig = {
    method: 'get',
    url: '/v1/meter',
    params: {
      location: LOCATION,
      start,
      end,
      interval,
    },
  };

  [start, end] = alignStartEndDate(start, end);
  const envConfig = {
    method: 'get',
    url: '/v1/weather',
    params: {
      start,
      end,
    },
  };

  const usageResource = useAxiosEffect(usageConfig, [range]);
  const envResource = useAxiosEffect(envConfig, [range]);

  if (envResource.data) {
    tempData = envResource.data;
    if (range === rangeProp.Monthly.name) {
      tempData = aggregateTempData(tempData);
    }
    tempData = parseTempData(tempData, quantity);
  }

  const getCharts = () => {
    if (usageResource.data) {
      return (
        <div>
          <UsageChart
            name="power"
            usageData={usageResource.data}
            tempData={tempData}
          />
          <UsageChart
            name="gas"
            usageData={usageResource.data}
            tempData={tempData}
          />
          <UsageChart
            name="water"
            usageData={usageResource.data}
            tempData={tempData}
          />
        </div>
      );
    }
    if (usageResource.loading) {
      return (
        <Flex align="center" justify="center">
          <AppSpinner />
        </Flex>
      );
    }
    return <div>Error</div>;
  };
  return <>{getCharts()}</>;
}

UsageGroup.defaultProps = {
  range: rangeProp.Today.name,
};

UsageGroup.propTypes = {
  range: PropTypes.string,
};

export default UsageGroup;
