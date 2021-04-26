import React from 'react';
import dayjs from 'dayjs';
import { Box, Icon, Flex, Stack } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { DATE_FORMAT } from '../../Constant/EnvConstants';
import { useAxiosEffect } from '../../Hooks/AxiosEffect';
import ConsumptionDetail from './ConsumptionDetail';

function MonthlyConsumption() {
  const history = useHistory();
  const date = dayjs().format(DATE_FORMAT);
  const config = {
    method: 'get',
    url: '/meter_data/overview',
    params: {},
  };
  const resource = useAxiosEffect(config, []);
  return (
    <Stack spacing={6}>
      <Box
        as="button"
        mt={6}
        pl={1}
        fontSize="lg"
        fontWeight="bold"
        letterSpacing={2}
        textAlign="left"
        color="grey.30"
        onClick={() => history.push('/statistics')}
      >
        Monthly Consumption
        <Icon name="chevron-right" ml={8} size="9xs" color="chevron-right" />
      </Box>
      <Flex align="center" justify="center">
        <ConsumptionDetail
          type="power"
          resource={resource}
          date={date}
          name={602}
          border
        />
        <ConsumptionDetail
          type="power"
          resource={resource}
          date={date}
          name={608}
        />
        {/* <ConsumptionDetail type="gas" resource={resource} date={date} border />
        <ConsumptionDetail type="water" resource={resource} date={date} /> */}
      </Flex>
    </Stack>
  );
}

export default MonthlyConsumption;
