import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Stack, Box } from '@chakra-ui/core';
import BackButton from '../../Components/Common/BackButton';
import PowerButton from '../../Components/Control/Light/PowerButton';
import IlluminanceController from '../../Components/Control/Light/IlluminanceController';
import { route2Name, findFirstMatch } from '../../Utils/Common';
import { getExtras } from '../../Utils/Api';

function LightControl() {
  const { floor } = useParams();
  let { name } = useParams();
  name = route2Name(name);
  const renderData = JSON.parse(sessionStorage.getItem('apps'));
  const app = findFirstMatch(renderData, 'name', name);
  const [power, setPower] = useState(app.status === 'ON');
  const [level, setLevel] = useState(getExtras([app], 'level'));

  return (
    <Flex align="center" justify="center">
      <Stack w="90%" p={2} maxW="414px" spacing={10} shouldWrapChildren>
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
        <PowerButton name={name} power={power} setPower={setPower} />
        <IlluminanceController
          name={name}
          power={power}
          level={level}
          setLevel={setLevel}
        />
      </Stack>
    </Flex>
  );
}

export default LightControl;
