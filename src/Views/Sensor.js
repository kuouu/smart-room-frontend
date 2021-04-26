import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Stack, Box } from '@chakra-ui/core';
import BackButton from '../Components/Common/BackButton';
import InformationItem from '../Components/Sensor/InformationItem';
import { route2Name } from '../Utils/Common';
import {findFirstMatch} from '../Utils/Common';
function Sensor() {
  const { floor } = useParams();
  let { name } = useParams();
  const renderData = JSON.parse(sessionStorage.getItem('apps'));
  const app = findFirstMatch(renderData, 'name', name);

  return (
    <Flex align="center" justify="center">
      <Stack w="90%" p={2} maxW="414px" spacing={6} shouldWrapChildren>
        <BackButton />
        <Box
          fontSize="lg"
          fontWeight="bold"
          letterSpacing={1}
          textAlign="center"
          color="grey.50"
        >
          {floor} {route2Name(name)}
        </Box>
        <InformationItem type="humidity" data={app.data.humidity} />
        <InformationItem type="temperature" data={app.data.temperature} />
      </Stack>
    </Flex>
  );
}

export default Sensor;
