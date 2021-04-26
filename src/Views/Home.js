import React from 'react';
import { Button, Stack, Flex } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import House from '../Components/Home/House';
import PowerConsumption from '../Components/Home/PowerConsumption';
import MonthlyConsumption from '../Components/Home/MonthlyConsumption';

function Home() {
  const history = useHistory();
  return (
    <Flex mt={3} align="center" justify="center" h="90vh">
      <Stack spacing={4}>
        <House />
        <Button
          maxW="sm"
          mt={4}
          fontSize="sm"
          letterSpacing={3}
          variantColor="green"
          variant="outline"
          onClick={() => history.push('/operation-status')}
        >
          Operation Status
        </Button>
        <PowerConsumption />
        <MonthlyConsumption />
      </Stack>
    </Flex>
  );
}

export default Home;
