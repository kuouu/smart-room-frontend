import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@chakra-ui/core';
import rangeProp from '../../Constant/StatisticsConstants';

function TimeRangeItem({ value, setRange }) {
  return (
    <MenuItem
      color="green.600"
      _focus={{ bg: 'green.50' }}
      onClick={() => setRange(value)}
    >
      {value}
    </MenuItem>
  );
}

TimeRangeItem.defaultProps = {
  value: rangeProp.Monthly.name,
  setRange: () => {},
};

TimeRangeItem.propTypes = {
  value: PropTypes.string,
  setRange: PropTypes.func,
};

export default TimeRangeItem;
