import { getWarningToastConfig } from '../Utils/Toast';

export const canChangeIlluminance = (power, toast) => {
  if (power) {
    return true;
  }
  toast(getWarningToastConfig('Please Switch ON the Light First !'));
  return false;
};

export default canChangeIlluminance;
