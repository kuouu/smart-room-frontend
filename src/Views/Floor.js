import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Box, Stack, Flex } from '@chakra-ui/core';
import BackButton from '../Components/Common/BackButton';
import ApplianceList from '../Components/Appliance/ApplianceList';

function Floor({ spacing }) {
  let { floor } = useParams();
  floor = parseInt(floor, 10);
  return (
    <Flex justify="center">
      <Stack p={2} w="90%" spacing={spacing} shouldWrapChildren>
        <BackButton />
        <Box
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing={1}
          textAlign="left"
          color="grey.50"
        >
          {floor}
        </Box>
        <ApplianceList spacing={spacing} floor={floor} button />
      </Stack>
    </Flex>
  );
}

Floor.defaultProps = {
  spacing: 3,
};

Floor.propTypes = {
  spacing: PropTypes.number,
};

export default Floor;
