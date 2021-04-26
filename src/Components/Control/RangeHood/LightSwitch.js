import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Flex } from '@chakra-ui/core';
import LightSwitchItem from './LightSwitchItem';
import LoadingMask from '../../Common/LoadingMask';
import { LOCATION } from '../../../Constant/EnvConstants';
import { useAxiosEffect } from '../../../Hooks/AxiosEffect';
import { getPowerConfig, getSuccessMsg } from '../../../Api/Power';

function LightSwitch({ name, light, setLight }) {
  const config = getPowerConfig(LOCATION, name, light);
  const successMsg = getSuccessMsg(light);
  const { loading } = useAxiosEffect(
    config,
    [light],
    { success: successMsg },
    false,
  );

  return (
    <Flex align="center" justify="flex-end" pr={4}>
      <Icon
        name="light"
        size={10}
        mr={2}
        color={light ? 'chevron-right' : 'grey.60'}
      />
      <LightSwitchItem light={light} setLight={setLight} />
      {loading && <LoadingMask />}
    </Flex>
  );
}

LightSwitch.defaultProps = {
  name: '',
  light: false,
  setLight: () => {},
};

LightSwitch.propTypes = {
  name: PropTypes.string,
  light: PropTypes.bool,
  setLight: PropTypes.func,
};

export default LightSwitch;
