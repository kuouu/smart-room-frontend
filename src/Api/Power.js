export const getPowerConfig = (device, power, temp) => {
  return {
    method: 'post',
    url: 'control',
    data: {
      device,
      command: power ? `${temp}C` : 'off'
    },
  };
};

export const getSuccessMsg = (power) => {
  return `Power is ${power ? 'ON' : 'OFF'} now`;
};

export default getPowerConfig;
