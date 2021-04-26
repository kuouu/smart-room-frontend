import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Box,
  PseudoBox,
  Icon,
  Stack,
  useToast,
} from '@chakra-ui/core';
import Strength from '../../Constant/AirFlowConstants';
import LoadingMask from './LoadingMask';
import { LOCATION } from '../../Constant/EnvConstants';
import { useAxiosEffect } from '../../Hooks/AxiosEffect';
import { getAirFlowConfig, getSuccessMsg } from '../../Api/Airflow';
import { showAirFlow, showAuto, equalToAuto } from '../../Logic/Airflow';

function AirFlowController({
  name,
  airflow,
  setAirFlow,
  states,
  canChangeAirFlow,
  canChangeAuto,
}) {
  const toast = useToast();
  const [renderAirFlow, setRenderAirFlow] = useState(airflow);
  const config = getAirFlowConfig(LOCATION, name, airflow);
  const successMsg = getSuccessMsg(airflow);
  const { loading } = useAxiosEffect(
    config,
    [airflow],
    { success: successMsg },
    false,
  );
  return (
    <Stack my={2}>
      <Box fontSize="lg" letterSpacing={2} color="grey.30">
        Air Flow Rate
      </Box>
      <Flex align="center" justify="space-between">
        <Slider
          value={renderAirFlow}
          min={1}
          max={8}
          w="70%"
          onChange={(value) =>
            canChangeAirFlow(states, toast) && setRenderAirFlow(value)
          }
          onMouseUp={() => setAirFlow(renderAirFlow)}
          onTouchEnd={() => setAirFlow(renderAirFlow)}
        >
          <SliderTrack
            bg={showAirFlow(states) ? 'green.100' : 'grey.60'}
            height={3}
            borderRadius={10}
          />
          <SliderFilledTrack
            bg={showAirFlow(states) ? 'button' : 'grey.60'}
            height={3}
            borderRadius={10}
          />
          {showAirFlow(states) ? (
            <SliderThumb size={8} backgroundColor="thumb" />
          ) : (
            ''
          )}
        </Slider>
        <Box fontSize="2xl" color="grey.70" minH={10} w={4} ml={6}>
          {showAirFlow(states) ? renderAirFlow : ''}
        </Box>
        <PseudoBox
          as="button"
          color={showAuto(states) ? 'chevron-right' : 'grey.60'}
          _hover={{ color: 'green.300' }}
          _active={{ color: 'chevron-right' }}
          onClick={() => {
            if (canChangeAuto(states, toast)) {
              setAirFlow(
                equalToAuto(states) ? Strength.highest : Strength.auto,
              );
              setRenderAirFlow(
                equalToAuto(states) ? Strength.highest : Strength.auto,
              );
            }
          }}
        >
          <Icon name="auto" size={8} color="currentColor" />
        </PseudoBox>
        {loading && <LoadingMask />}
      </Flex>
    </Stack>
  );
}

AirFlowController.defaultProps = {
  name: '',
  airflow: 0,
  setAirFlow: () => {},
  states: {},
  canChangeAirFlow: () => {},
  canChangeAuto: () => {},
};

AirFlowController.propTypes = {
  name: PropTypes.string,
  airflow: PropTypes.number,
  setAirFlow: PropTypes.func,
  states: PropTypes.instanceOf(Object),
  canChangeAirFlow: PropTypes.func,
  canChangeAuto: PropTypes.func,
};

export default AirFlowController;
