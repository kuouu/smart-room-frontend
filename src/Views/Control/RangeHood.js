import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Stack, Box } from '@chakra-ui/core';
import BackButton from '../../Components/Common/BackButton';
import LightSwitch from '../../Components/Control/RangeHood/LightSwitch';
import PowerButton from '../../Components/Control/RangeHood/PowerButton';
import AirFlowController from '../../Components/Common/AirFlowController';
import { route2Name, findFirstMatch } from '../../Utils/Common';
import { getExtras } from '../../Utils/Api';
import { canChangeAirFlow, canChangeAuto } from '../../Logic/RangeHood';

function RangeHoodControl() {
  const { floor } = useParams();
  let { name } = useParams();
  name = route2Name(name);
  const lightName = name.concat(' - Light');
  const renderData = JSON.parse(sessionStorage.getItem('apps'));
  const app = findFirstMatch(renderData, 'name', name);
  const lightApp = findFirstMatch(renderData, 'name', lightName);
  const [power, setPower] = useState(app.status === 'ON');
  const [light, setLight] = useState(lightApp.status === 'ON');
  const [airflow, setAirFlow] = useState(getExtras([app], 'airflow'));

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
          {floor} F {name}
        </Box>
        <LightSwitch name={lightName} light={light} setLight={setLight} />
        <PowerButton name={name} power={power} setPower={setPower} />
        <AirFlowController
          name={name}
          airflow={airflow}
          setAirFlow={setAirFlow}
          states={{ power, airflow }}
          canChangeAirFlow={canChangeAirFlow}
          canChangeAuto={canChangeAuto}
        />
      </Stack>
    </Flex>
  );
}

export default RangeHoodControl;
