import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/core';
import TimeRangeItem from './TimeRangeItem';
import rangeProp from '../../Constant/StatisticsConstants';

function TimeRangeMenu({ range, setRange }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        minW="6xs"
        variant="outline"
        variantColor="green"
        rightIcon="chevron-down"
      >
        {range}
      </MenuButton>
      <MenuList>
        {Object.keys(rangeProp).map((str) => (
          <TimeRangeItem key={str} value={str} setRange={setRange}>
            {str}
          </TimeRangeItem>
        ))}
      </MenuList>
    </Menu>
  );
}
TimeRangeMenu.defaultProps = {
  range: rangeProp.Today.name,
  setRange: () => {},
};

TimeRangeMenu.propTypes = {
  range: PropTypes.string,
  setRange: PropTypes.func,
};
export default TimeRangeMenu;
