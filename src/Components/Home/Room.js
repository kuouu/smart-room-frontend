import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

function Room({ room }) {
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
      onClick={() => history.push(`/home/${room}`, { from: 'Room' })}
    >
      {room}
    </Button>
  );
}

Room.defaultProps = {
  room: 0,
};

Room.propTypes = {
  room: PropTypes.number,
};

export default Room;
