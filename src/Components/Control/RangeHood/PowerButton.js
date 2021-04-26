import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@chakra-ui/core';
import LoadingMask from '../../Common/LoadingMask';
import { LOCATION } from '../../../Constant/EnvConstants';
import { useAxiosEffect } from '../../../Hooks/AxiosEffect';
import { getPowerConfig, getSuccessMsg } from '../../../Api/Power';

function PowerButton({ name, power, setPower }) {
  const config = getPowerConfig(LOCATION, name, power);
  const successMsg = getSuccessMsg(power);
  const { loading } = useAxiosEffect(
    config,
    [power],
    { success: successMsg },
    false,
  );
  return (
    <Box textAlign="center" mt={2} mb={8}>
      <IconButton
        size="lg"
        height="2xs"
        width="2xs"
        fontSize="180px"
        icon="fan-xl"
        isRound
        variantColor={power ? 'green' : 'button-grey'}
        color={power ? 'button' : 'button-grey.600'}
        onClick={() => {
          setPower(!power);
        }}
      />
      {loading && <LoadingMask />}
    </Box>
  );
}

PowerButton.defaultProps = {
  name: '',
  power: false,
  setPower: () => {},
};

PowerButton.propTypes = {
  name: PropTypes.string,
  power: PropTypes.bool,
  setPower: PropTypes.func,
};

export default PowerButton;
