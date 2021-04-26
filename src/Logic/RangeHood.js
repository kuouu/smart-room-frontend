import Strength from '../Constant/AirFlowConstants';
import { getWarningToastConfig } from '../Utils/Toast';

export const canChangeAirFlow = ({ power, airflow }, toast) => {
  if (power) {
    if (airflow === Strength.auto) {
      toast(
        getWarningToastConfig('Airflow can not be controlled in AUTO mode !'),
      );
      return false;
    }
    return true;
  }
  toast(getWarningToastConfig('Please Switch ON the Range Hood First !'));
  return false;
};

export const canChangeAuto = ({ power }, toast) => {
  if (power) {
    return true;
  }
  toast(getWarningToastConfig('Please Switch ON the Range Hood First !'));
  return false;
};

export default { canChangeAirFlow, canChangeAuto };
