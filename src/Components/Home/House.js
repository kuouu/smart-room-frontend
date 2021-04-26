import React from 'react';
import { Stack, Flex, Icon } from '@chakra-ui/core';
import Room from './Room'

function House() {
  return (
    <Stack w="100%">
      <Flex align="center" flexDir="column">
        <Icon name="roof" width="full" maxW="sm" minH="8xs" color="grey.20" />
      </Flex>
      <Flex align="center" flexDir="column">
        <Room room={602} />
        <Room room={608} />
      </Flex>
    </Stack>
  );
}

export default House;
