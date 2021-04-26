import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Flex } from '@chakra-ui/core';
import BackButton from '../Components/Common/BackButton';
import ApplianceList from '../Components/Appliance/ApplianceList';

function OperationStatus(props) {
  const { spacing } = props;
  return (
    <Flex justify="center">
      <Stack p={2} w="90%" spacing={spacing} shouldWrapChildren>
        <BackButton />
        <Box
          fontSize="lg"
          fontWeight="bold"
          letterSpacing={2}
          textAlign="left"
          color="chevron-right"
        >
          Operation Status
        </Box>
        <Flex
          justify="space-between"
          backgroundColor="grey.40"
          color="grey.30"
          fontSize="sm"
          letterSpacing={2}
        >
          <Box>Electrical Appliances</Box>
          <Box>Status</Box>
        </Flex>
        <ApplianceList spacing={spacing} />
        <Flex
          justify="space-between"
          backgroundColor="grey.40"
          color="grey.30"
          fontSize="sm"
          letterSpacing={3}
        >
          <Box>House Occupancy</Box>
          <Box mr="0.5rem">Yes</Box>
        </Flex>
      </Stack>
    </Flex>
  );
}

OperationStatus.defaultProps = {
  spacing: 3,
};

OperationStatus.propTypes = {
  spacing: PropTypes.number,
};

export default OperationStatus;
