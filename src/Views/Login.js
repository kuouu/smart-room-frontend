import React, { useState } from 'react';
import { Button, Text, Input, Stack, Flex, useToast } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import callLoginApi from '../Api/Login';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [, setCookie] = useCookies(['access_token']);
  const toast = useToast();
  const history = useHistory();

  return (
    <Flex align="center" justify="center" h="90vh">
      <Stack spacing={4}>
        <Text
          fontSize="lg"
          color="chevron-right"
          textAlign="center"
          letterSpacing={3}
        >
          Shalun Smart Home App
        </Text>
        <Input
          placeholder="E-mail"
          mt={10}
          border="0px"
          borderBottom="2px"
          borderBottomColor="grey.10"
          fontSize="sm"
          letterSpacing={3}
          onChange={(event) => setAccount(event.target.value)}
        />
        <Input
          placeholder="Password"
          border="0px"
          borderBottom="2px"
          borderBottomColor="grey.10"
          type="password"
          fontSize="sm"
          letterSpacing={3}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          isLoading={loading}
          color="white"
          bg={error ? 'err' : 'button'}
          mt={12}
          fontSize="sm"
          letterSpacing={3}
          onClick={() => {
            callLoginApi(
              account,
              password,
              setLoading,
              setError,
              setCookie,
              history,
              toast,
            );
          }}
        >
          LOGIN
        </Button>
      </Stack>
    </Flex>
  );
}

export default Login;
