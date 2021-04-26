import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@chakra-ui/core';

function AppSpinner({ color, size = 'md', thickness = '2px' }) {
  return (
    <Spinner
      color={color}
      size={size}
      thickness={thickness}
      emptyColor="gray.200"
      speed="0.65s"
    />
  );
}

AppSpinner.defaultProps = {
  color: 'button',
  size: 'md',
  thickness: '2px',
};

AppSpinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  thickness: PropTypes.string,
};

export default AppSpinner;
