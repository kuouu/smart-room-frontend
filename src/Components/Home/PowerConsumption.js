import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import AppSpinner from '../Common/Spinner';
import { useAxiosEffect } from '../../Hooks/AxiosEffect';
import { round } from '../../Utils/Common';

function PowerConsumption() {
  const config = {
    method: 'get',
    url: '/meter_data/overview',
    params: {},
  };
  const resource = useAxiosEffect(config, []);

  const getConsumption = () => {
    if (resource.loading) {
      return <AppSpinner />;
    }
    if (resource.data) {
      return round(resource.data.total);
    }
    return 'Error';
  };

  return (
    <Flex align="center" justify="space-between">
      <Box
        pl={1}
        fontSize="lg"
        fontWeight="bold"
        letterSpacing={2}
        color="grey.30"
      >
        Power Consumption
      </Box>
      <Text fontSize="xl" color="grey.30">
        {getConsumption()} W
      </Text>
    </Flex>
  );
}

export default PowerConsumption;
