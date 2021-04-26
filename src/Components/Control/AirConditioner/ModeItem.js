import React from 'react';
import PropTypes from 'prop-types';
import { Icon, PseudoBox, useToast } from '@chakra-ui/core';
import Strength from '../../../Constant/AirFlowConstants';
import { ACMode } from '../../../Constant/HemsConstants';
import { array2ObjByKey } from '../../../Utils/Common';
import { canChangeMode } from '../../../Logic/AirConditioner';

function ModeItem({ id, icon, mode, setMode, setAirFlow, power }) {
  const states = { id, mode, power };
  const toast = useToast();
  return (
    <PseudoBox
      as="button"
      color={mode[id] && power ? 'chevron-right' : 'grey.60'}
      onClick={() => {
        if (canChangeMode(states, toast)) {
          if (id === 'auto') setAirFlow(Strength.auto);
          setMode(array2ObjByKey(ACMode, id));
        }
      }}
      _hover={{ color: 'green.300' }}
      _active={{ color: 'chevron-right' }}
    >
      <Icon name={icon} size={8} color="currentColor" />
    </PseudoBox>
  );
}

ModeItem.defaultProps = {
  id: 'error',
  icon: '',
  mode: {
    // auto: false,
    cool: false,
    // heating: false,
    // dehumidification: false,
    fan: false,
    off: false
  },
  setMode: () => {},
  setAirFlow: () => {},
  power: false,
};

ModeItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  mode: PropTypes.shape({
    // auto: PropTypes.bool,
    cool: PropTypes.bool,
    // heating: PropTypes.bool,
    // dehumidification: PropTypes.bool,
    fan: PropTypes.bool,
    off: PropTypes.bool,
  }),
  setAirFlow: PropTypes.func,
  setMode: PropTypes.func,
  power: PropTypes.bool,
};

export default ModeItem;
