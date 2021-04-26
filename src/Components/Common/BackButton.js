import React from 'react';
import { Button, Icon } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

function BackButton() {
  const history = useHistory();
  return (
    <Button
      variant="ghost"
      variantColor="green"
      color="grey.30"
      fontSize="sm"
      letterSpacing={1}
      justifyContent="flex-start"
      pl={0}
      mb={3}
      onClick={() => {
        history.goBack();
      }}
    >
      <Icon name="chevron-left" size="9xs" color="button" ml={-3} />
      Back
    </Button>
  );
}

export default BackButton;
