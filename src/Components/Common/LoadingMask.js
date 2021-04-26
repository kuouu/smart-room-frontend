import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import AppSpinner from './Spinner';

function ControllingMask() {
  return (
    <Flex
      bg="gray.300"
      position="fixed"
      top="100px"
      left="50%"
      ml="-45vw"
      width="90vw"
      minH="550px"
      opacity="0.7"
      borderRadius="20px"
      zIndex="50"
      align="center"
      justify="center"
      direction="column"
    >
      <AppSpinner size="lg" thickness="4px" />
      <Text fontSize="lg" pt={2}>
        Controlling ...
      </Text>
    </Flex>
  );
}

export default ControllingMask;
