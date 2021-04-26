import Strength from '../Constant/AirFlowConstants';
import { getWarningToastConfig } from '../Utils/Toast';

export const canChangeTemp = (power, toast) => {
  
  if (power) {
    return true;
  }
  toast(getWarningToastConfig('Please Switch ON the A/C First !'));
  return false;
};

export const canChangeMode = ({ power, id, mode }, toast) => {
  if (power && !mode[id]) {
    return true;
  }
  if (!power) {
    toast(getWarningToastConfig('Please Switch ON the A/C First !'));
    return false;
  }
  return false;
};

export const canChangeAirFlow = ({ power, airflow }, toast) => {
  if (!power) {
    toast(getWarningToastConfig('Please Switch ON the A/C First !'));
    return false;
  }
  if (airflow === Strength.auto) {
    toast(
      getWarningToastConfig('Airflow can not be controlled in AUTO mode !'),
    );
    return false;
  }
  return true;
};

export const canChangeAirflowAuto = ({ power, mode }, toast) => {
  if (!power) {
    toast(getWarningToastConfig('Please Switch ON the A/C First !'));
    return false;
  }
  if (mode.auto) {
    toast(
      getWarningToastConfig('Airflow can not be controlled in AUTO mode !'),
    );
    return false;
  }
  return true;
};
export default {
  canChangeTemp,
  canChangeMode,
  canChangeAirFlow,
  canChangeAirflowAuto,
};
