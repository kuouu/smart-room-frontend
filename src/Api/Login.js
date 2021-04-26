import axiosRequest from '../Constant/WebConstants';
import { getErrorToastConfig } from '../Utils/Toast';

async function callLoginApi(
  account,
  password,
  setLoading,
  setError,
  setCookie,
  history,
  toast,
) {
  try {
    setLoading(true);
    const response = await axiosRequest({
      method: 'post',
      url: '/login',
      data: {
        account: account,
        password,
      },
    });
    setCookie('access_token', response.data.token);
    history.push('/home');
  } catch (error) {
    setLoading(false);
    setError(true);
    toast(getErrorToastConfig(error));
  }
}

export default callLoginApi;
