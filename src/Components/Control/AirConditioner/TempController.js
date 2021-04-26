import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, IconButton, useToast } from '@chakra-ui/core';
import LoadingMask from '../../Common/LoadingMask';
import { useAxiosEffect } from '../../../Hooks/AxiosEffect';
import { getTempConfig, getSuccessMsg } from '../../../Api/Temperature';
import { canChangeTemp } from '../../../Logic/AirConditioner';

function TempController({ name, temp, setTemp, power, mode }) {
  const toast = useToast();
  const config = getTempConfig(name, temp);
  const successMsg = getSuccessMsg(temp);
  const { loading } = useAxiosEffect(
    config,
    [temp],
    { success: successMsg },
    false,
  );
  
  return (
    <Flex justify="center">
      <Flex
        justify="space-around"
        align="center"
        h="275px"
        w="275px"
        bgImage={`url('${window.location.origin}/grey-circle.svg')`}
        bgSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        {!mode.fan && <IconButton
          isRound
          icon="add"
          variantColor={power ? 'green' : 'button-grey'}
          ml={-8}
          onClick={() => {
            if (canChangeTemp(power, toast)) setTemp(temp + 1);
          }}
        />}
        <Box
          fontSize="6xl"
          letterSpacing={5}
          color={power ? 'chevron-right' : 'gray.400'}
        >
          {mode.fan ? 'fan' : `${temp}℃`}
        </Box>
        {!mode.fan && < IconButton
          isRound
          icon="minus"
          variantColor={power ? 'green' : 'button-grey'}
          mr={-8}
          onClick={() => {
            if (canChangeTemp(power, toast)) setTemp(temp - 1);
          }}
        />}
      </Flex>
      {loading && <LoadingMask />}
    </Flex>
  );
}

TempController.defaultProps = {
  name: '',
  temp: 25,
  setTemp: () => { },
  power: false,
  mode: {
    cool: false,
    fan: false,
    off: false
  },
};

TempController.propTypes = {
  name: PropTypes.string,
  temp: PropTypes.number,
  setTemp: PropTypes.func,
  power: PropTypes.bool,
  mode: {
    cool: PropTypes.bool,
    fan: PropTypes.bool,
    off: PropTypes.bool
  },
};

export default TempController;
