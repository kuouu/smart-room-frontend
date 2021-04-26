import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Flex, Box, Button } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { HemsTypeAliasMapping } from '../../Constant/HemsConstants';
import { name2Route } from '../../Utils/Common';

function ApplianceItem({
  appliance: { name, device_type, data, room },
  styleProps: { button },
}) {
  const appType = HemsTypeAliasMapping[device_type];
  const history = useHistory();
  const Item = (
    <Flex
      align="center"
      justify="space-between"
      color="grey.30"
      fontSize="sm"
      letterSpacing={3}
      w="100%"
    >
      <Flex align="center">
        <Icon name={appType} size={5} color="chevron-right" />
        <Box ml={3}>{name}</Box>
      </Flex>
      {button ? (
        <Icon name="chevron-right" size={6} color="chevron-right" />
      ) : (
        <Box textAlign="center" minW="3rem">
          {data.status}
        </Box>
      )}
    </Flex>
  );
  return button ? (
    <Button
      key={name}
      w="full"
      variant="ghost"
      p={0}
      onClick={() =>
        history.push(`/home/${room}/${appType}/${name2Route(name)}`)
      }
    >
      {Item}
    </Button>
  ) : (
    Item
  );
}

ApplianceItem.defaultProps = {
  appliance: {
    name: 'ERROR',
    device_type: '',
    data: {},
    room: '',
  },
  styleProps: {
    button: false,
  },
};

ApplianceItem.propTypes = {
  appliance: PropTypes.shape({
    name: PropTypes.string,
    device_type: PropTypes.string,
    time: PropTypes.object,
    room: PropTypes.string,
  }),
  styleProps: PropTypes.shape({
    button: PropTypes.bool,
  }),
};

export default ApplianceItem;
