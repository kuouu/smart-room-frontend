import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, Flex } from '@chakra-ui/core';
import BackButton from '../../Components/Common/BackButton';
import TempController from '../../Components/Control/AirConditioner/TempController';
import ModeController from '../../Components/Control/AirConditioner/ModeController';
import PowerButton from '../../Components/Control/AirConditioner/PowerButton';
import { ACMode } from '../../Constant/HemsConstants';
import {
  route2Name,
  findFirstMatch,
  array2ObjByKey,
  filterAbnormalTemp,
  filterListByUniqueKey
} from '../../Utils/Common';
import { useAxiosEffect } from '../../Hooks/AxiosEffect';

function AirConditionerControl() {
  const { floor } = useParams();
  const config = {
    method: 'get',
    url: '/appliance',
    params: {
      room: floor
    },
  };
  let { name } = useParams();
  const renderData = JSON.parse(sessionStorage.getItem('apps'));
  const app = findFirstMatch(renderData, 'name', name);
  const [power, setPower] = useState(app.data.status === 'ON');
  const [temp, setTemp] = useState(filterAbnormalTemp(app.data.temp));
  const [mode, setMode] = useState(array2ObjByKey(ACMode, app.data.mode));
  // const [airflow, setAirFlow] = useState(AirFlowConstants.auto);
  const resource = useAxiosEffect(config, [power, temp, mode]);
  useEffect(() => {
    if (resource.data) {
      const storage = filterListByUniqueKey(resource.data, (x) => x.name).sort(
        (a, b) => {
          return `${a.name}`.localeCompare(b.name);
        },
      );
      window.sessionStorage.setItem('apps', JSON.stringify(storage));
    }
  }, [resource])
  return (
    <Flex align="center" justify="center">
      <Stack w="90%" p={2} maxW="414px" spacing={4} shouldWrapChildren>
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
        <PowerButton name={name} power={power} setPower={setPower} temp={temp} />
        <TempController
          name={name}
          temp={temp}
          setTemp={setTemp}
          power={power}
          mode={mode}
        />
        <ModeController
          name={name}
          mode={mode}
          setMode={setMode}
          // setAirFlow={setAirFlow}
          power={power}
          temp={temp}
        />
        {/* <AirFlowController
          name={name}
          airflow={airflow}
          setAirFlow={setAirFlow}
          states={{ power, mode, airflow }}
          canChangeAirFlow={canChangeAirFlow}
          canChangeAuto={canChangeAirflowAuto}
        /> */}
      </Stack>
    </Flex>
  );
}

export default AirConditionerControl;
