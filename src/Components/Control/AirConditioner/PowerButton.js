import React from 'react';
import PropTypes from 'prop-types';
import { Icon, PseudoBox, Box } from '@chakra-ui/core';
import LoadingMask from '../../Common/LoadingMask';
import { useAxiosEffect } from '../../../Hooks/AxiosEffect';
import { getPowerConfig, getSuccessMsg } from '../../../Api/Power';

function PowerButton({ name, power, setPower, temp }) {
  const config = getPowerConfig(name, power, temp);
  const successMsg = getSuccessMsg(power);
  const { loading } = useAxiosEffect(
    config,
    [power],
    { success: successMsg },
    false,
  );
  return (
    <Box textAlign="right">
      <PseudoBox
        as="button"
        color={power ? 'gray.400' : 'button'}
        onClick={() => setPower(!power)}
        _hover={{ color: 'green.300' }}
        _active={{ color: 'chevron-right' }}
      >
        <Icon name="power" size={12} color="currentColor" />
      </PseudoBox>
      {loading && <LoadingMask />}
    </Box>
  );
}

PowerButton.defaultProps = {
  name: '',
  power: false,
  temp: 25,
  setPower: () => {},
  setMode: () => {},
  setAirFlow: () => {},
};

PowerButton.propTypes = {
  name: PropTypes.string,
  power: PropTypes.bool,
  temp: PropTypes.number,
  setPower: PropTypes.func,
  setMode: PropTypes.func,
  setAirFlow: PropTypes.func,
};

export default PowerButton;
