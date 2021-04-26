import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Box,
  Icon,
  Stack,
  useToast,
} from '@chakra-ui/core';
import LoadingMask from '../../Common/LoadingMask';
import { LOCATION } from '../../../Constant/EnvConstants';
import { useAxiosEffect } from '../../../Hooks/AxiosEffect';
import { getIlluConfig, getSuccessMsg } from '../../../Api/Light';
import { canChangeIlluminance } from '../../../Logic/Light';

function IlluminanceController({ name, power, level, setLevel }) {
  const toast = useToast();
  const [renderLevel, setRenderLevel] = useState(level);
  const config = getIlluConfig(LOCATION, name, level);
  const successMsg = getSuccessMsg(level);
  const { loading } = useAxiosEffect(
    config,
    [level],
    { success: successMsg },
    false,
  );

  return (
    <Stack my={2}>
      <Flex align="center" justify="space-between">
        <Box fontSize="lg" letterSpacing={2} color="grey.30">
          Illuminance level
        </Box>
        <Box fontSize="lg" letterSpacing={2} color="grey.30">
          {power && `${renderLevel}%`}
        </Box>
      </Flex>
      <Flex align="center" justify="space-between">
        <Icon name="illu-low" size={8} color="grey.60" />
        <Slider
          value={renderLevel}
          min={0}
          max={100}
          mx={6}
          onChange={(value) =>
            canChangeIlluminance(power, toast) && setRenderLevel(value)
          }
          onMouseUp={() => setLevel(renderLevel)}
          onTouchEnd={() => setLevel(renderLevel)}
        >
          <SliderTrack
            bg={power ? 'green.100' : 'grey.60'}
            height={3}
            borderRadius={10}
          />
          <SliderFilledTrack
            bg={power ? 'button' : 'grey.60'}
            height={3}
            borderRadius={10}
          />
          {power ? <SliderThumb size={8} backgroundColor="thumb" /> : ''}
        </Slider>
        <Icon name="illu-high" size={8} color="grey.60" />
      </Flex>
      {loading && <LoadingMask />}
    </Stack>
  );
}

IlluminanceController.defaultProps = {
  name: '',
  power: false,
  level: 50,
  setLevel: () => {},
};

IlluminanceController.propTypes = {
  name: PropTypes.string,
  power: PropTypes.bool,
  level: PropTypes.number,
  setLevel: PropTypes.func,
};

export default IlluminanceController;
