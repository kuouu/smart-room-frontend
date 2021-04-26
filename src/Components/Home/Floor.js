import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

function Floor({ floor }) {
  const history = useHistory();
  return (
    <Button
      color="white"
      bg="button"
      fontSize="sm"
      letterSpacing="wide"
      w="75%"
      m={1}
      rounded={0}
      minH="9xs"
      maxH="7xs"
      minW="7xs"
      maxW="xs"
      onClick={() => history.push(`/home/${floor}`, { from: 'Floor' })}
    >
      {floor}F
    </Button>
  );
}

Floor.defaultProps = {
  floor: 0,
};

Floor.propTypes = {
  floor: PropTypes.number,
};

export default Floor;
