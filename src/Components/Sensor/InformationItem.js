import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Stack, Box } from '@chakra-ui/core';
import SensorConstants from '../../Constant/SensorConstants';

function InformationItem({ type, data }) {
  const { name, unit } = SensorConstants[type];
  
  return (
    <Stack alignItems="center" justifyContent="center" mt={6}>
      <Icon name={type} color="button" size={13} />
      <Box color="grey.30" fontSize="lg" letterSpacing={2}>
        {name}
      </Box>
      <Box fontSize={56} letterSpacing={5}>
        {data} {unit}
      </Box>
    </Stack>
  );
}

InformationItem.defaultProps = {
  type: 'temperature',
  data: 0
};

InformationItem.propTypes = {
  type: PropTypes.string,
  data: PropTypes.number
};
export default InformationItem;
