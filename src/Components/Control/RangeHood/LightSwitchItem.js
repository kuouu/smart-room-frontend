import React from 'react';
import PropTypes from 'prop-types';
import { VisuallyHidden, ControlBox, Box } from '@chakra-ui/core';

function LightSwitchItem({ light, setLight }) {
  return (
    <label htmlFor="light-switch">
      <VisuallyHidden
        id="light-switch"
        as="input"
        type="checkbox"
        defaultChecked={light}
        onChange={() => {
          setLight(!light);
        }}
      />
      <ControlBox
        borderWidth="1px"
        p="2px"
        size={3}
        mt={3}
        width={7}
        rounded="full"
        boxSizing="content-box"
        bg="#DDDDDD"
        color="#727272"
        _child={{
          transform: 'translateX(-13px)',
        }}
        _checkedAndChild={{
          transform: 'translateX(15px)',
        }}
        _checked={{ bg: '#B5E7EE', color: '#43A0B2', borderColor: '#B5E7EE' }}
      >
        <Box
          bg="currentColor"
          transition="transform 250ms"
          rounded="full"
          size={7}
        />
      </ControlBox>
    </label>
  );
}

LightSwitchItem.defaultProps = {
  light: false,
  setLight: () => {},
};

LightSwitchItem.propTypes = {
  light: PropTypes.bool,
  setLight: PropTypes.func,
};
export default LightSwitchItem;
