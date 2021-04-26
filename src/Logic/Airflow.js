import Strength from '../Constant/AirFlowConstants';

export const showAirFlow = ({ power, airflow }) => {
  return power && airflow !== Strength.auto;
};

export const showAuto = ({ power, airflow }) => {
  return airflow === Strength.auto && power;
};

export const equalToAuto = ({ airflow }) => {
  return airflow === Strength.auto;
};

export default { showAirFlow, showAuto };
