import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/core';
import ModeItem from './ModeItem';
import LoadingMask from '../../Common/LoadingMask';
import { useAxiosEffect } from '../../../Hooks/AxiosEffect';
import { getModeConfig, getSuccessMsg } from '../../../Api/ACMode';
import { getObjKey } from '../../../Utils/Common'

function ModeController({ name, mode, setMode, power, setAirFlow, temp }) {
  const config = getModeConfig(name, getObjKey(mode), temp);
  const successMsg = getSuccessMsg(mode);
  const { loading } = useAxiosEffect(
    config,
    [mode],
    { success: successMsg },
    false,
  );
  return (
    <Flex justify="space-around" my={4}>
      {/* <ModeItem
        id="auto"
        icon="auto"
        mode={mode}
        setMode={setMode}
        power={power}
        setAirFlow={setAirFlow}
      /> */}
      <ModeItem
        id="cool"
        icon="ac"
        mode={mode}
        setMode={setMode}
        power={power}
        setAirFlow={setAirFlow}
      />
      {/* <ModeItem
        id="heating"
        icon="heat"
        mode={mode}
        setMode={setMode}
        power={power}
        setAirFlow={setAirFlow}
      /> */}
      {/* <ModeItem
        id="dehumidification"
        icon="water"
        mode={mode}
        setMode={setMode}
        power={power}
        setAirFlow={setAirFlow}
      /> */}
      <ModeItem
        id="fan"
        icon="fan"
        mode={mode}
        setMode={setMode}
        power={power}
        setAirFlow={setAirFlow}
      />
      {loading && <LoadingMask />}
    </Flex>
  );
}

ModeController.defaultProps = {
  name: '',
  mode: {
    // auto: true,
    cool: false,
    // heating: false,
    // dehumidification: false,
    fan: false,
    off: false
  },
  setMode: () => { },
  power: false,
  setAirFlow: () => { },
  temp: 25
};

ModeController.propTypes = {
  name: PropTypes.string,
  mode: PropTypes.shape({
    // auto: PropTypes.bool,
    cool: PropTypes.bool,
    // heating: PropTypes.bool,
    // dehumidification: PropTypes.bool,
    fan: PropTypes.bool,
    off: PropTypes.bool,
  }),
  setMode: PropTypes.func,
  power: PropTypes.bool,
  setAirFlow: PropTypes.func,
  temp: PropTypes.number
};

export default ModeController;
