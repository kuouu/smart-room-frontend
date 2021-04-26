import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Flex } from '@chakra-ui/core';
import ApplianceItem from './ApplianceItem';
import { useAxiosEffect } from '../../Hooks/AxiosEffect';
import { filterListByUniqueKey } from '../../Utils/Common';
import AppSpinner from '../Common/Spinner';

function ApplianceList({ floor, button, spacing }) {
  const styleProps = {
    button,
  };
  const config = {
    method: 'get',
    url: '/appliance',
    params: {
      room: floor === 0 ? '' : floor
    },
  };
  const resource = useAxiosEffect(config, []);

  const generateList = (dataList) => {
    return dataList.map((app) => {
      return (
        <ApplianceItem key={app.name} appliance={app} styleProps={styleProps} />
      );
    });
  };
  const getList = () => {
    if (resource.data) {
      let renderData = filterListByUniqueKey(resource.data, (x) => x.name).sort(
        (a, b) => {
          return `${a.name}`.localeCompare(b.name);
        },
      );
      window.sessionStorage.setItem('apps', JSON.stringify(renderData));
      return (
        <Stack spacing={spacing} shouldWrapChildren>
          {generateList(renderData)}
        </Stack>
      );
    }
    if (resource.loading) {
      return (
        <Flex align="center" justify="center">
          <AppSpinner />
        </Flex>
      );
    }
    return <div>Error</div>;
  };

  return <>{getList()}</>;
}

ApplianceList.defaultProps = {
  floor: 0,
  button: false,
  spacing: 0,
};

ApplianceList.propTypes = {
  floor: PropTypes.number,
  button: PropTypes.bool,
  spacing: PropTypes.number,
};

export default ApplianceList;
