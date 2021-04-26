import React, { useState } from 'react';
import { Stack, Flex, Box } from '@chakra-ui/core';
import rangeProp from '../Constant/StatisticsConstants';
import BackButton from '../Components/Common/BackButton';
import TimeRangeMenu from '../Components/Statistics/TimeRangeMenu';
import UsageGroup from '../Components/Statistics/UsageGroup';

function Statistics() {
  const [range, setRange] = useState(rangeProp.Today.name);
  return (
    <Flex justify="center">
      <Stack p={2} w="95%">
        <BackButton />
        <Flex justify="space-between">
          <Box
            fontSize="lg"
            fontWeight="bold"
            letterSpacing={2}
            textAlign="left"
            color="chevron-right"
          >
            Consumption
          </Box>
          <TimeRangeMenu range={range} setRange={setRange} />
        </Flex>
        <UsageGroup range={range} />
      </Stack>
    </Flex>
  );
}

export default Statistics;
