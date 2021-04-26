import AirflowConstants from '../Constant/AirFlowConstants';
import { objectFlip } from '../Utils/Common';

export const getAirFlowConfig = (location, name, airflow) => {
  return {
    method: 'post',
    url: '/v1/hems',
    data: {
      location,
      name,
      action: { airflow },
    },
  };
};

export const getSuccessMsg = (airflow) => {
  const toStringObj = objectFlip(AirflowConstants);
  return `Airflow is ${toStringObj[airflow]} now`;
};

export default { getAirFlowConfig, getSuccessMsg };
