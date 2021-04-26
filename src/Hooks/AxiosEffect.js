import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/core';
import { useCookies } from 'react-cookie';
import { addAuthHeader } from '../Utils/Api';
import { getSuccessToastConfig, getErrorToastConfig } from '../Utils/Toast';
import axiosRequest from '../Constant/WebConstants';

export function useAxiosEffect(
  options,
  vars,
  msg = {},
  componentDidUpdate = true,
) {
  const [requests, setRequests] = useState({
    loading: false,
    data: null,
    error: false,
  });
  const [pass, setPass] = useState(componentDidUpdate);
  const [cookies] = useCookies(['access_key']);
  const toast = useToast();
  const config = addAuthHeader(options, cookies);
  useEffect(() => {
    if (pass) {
      setRequests({
        loading: true,
        data: null,
        error: false,
      });
      axiosRequest(config)
        .then((response) => {
          setRequests({
            loading: false,
            data: response.data,
            error: false,
          });
          if (msg.success) {
            toast(getSuccessToastConfig(msg.success));
          }
        })
        .catch((error) => {
          setRequests({ loading: false, data: null, error: true });
          toast(getErrorToastConfig(error));
        });
    }
    setPass(true);
    // eslint-disable-next-line
  }, vars);
  return requests;
}

export default useAxiosEffect;
