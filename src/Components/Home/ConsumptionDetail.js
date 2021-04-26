import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';
import AppSpinner from '../Common/Spinner';

function ConsumptionDetail({ type, resource, border, date, name }) {
  const getConsumption = () => {
    if (resource.loading) {
      return <AppSpinner />;
    } 
    if (resource.data) {
      return resource.data.room[name].toFixed(2)
    }
    return 'Error';
  };
  return (
    <Box
      minW="7xs"
      p={5}
      textAlign="center"
      fontSize="md"
      letterSpacing={2}
      color="grey.30"
      borderRight={border && '2px'}
      borderRightColor="button"
    >
      <Box mb={2}>{name}</Box>
      <Box>
        {getConsumption()}W
      </Box>
    </Box>
  );
}

ConsumptionDetail.defaultProps = {
  type: 'power',
  border: false,
  resource: {
    loading: false,
    data: null,
    error: false,
  },
  date: '2020-01-01',
  name: 0
};

ConsumptionDetail.propTypes = {
  type: PropTypes.string,
  border: PropTypes.bool,
  resource: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    error: PropTypes.bool,
  }),
  date: PropTypes.string,
  name: PropTypes.number
};

export default ConsumptionDetail;
