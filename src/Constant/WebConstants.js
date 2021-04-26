import axios from 'axios';
import { HOME_CONTROL_BACKEND } from './EnvConstants';

axios.defaults.withCredentials = true;
const axiosRequest = axios.create({
  withCredentials: false,
  baseURL: HOME_CONTROL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosRequest;
