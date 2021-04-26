export const getTempConfig = (device, temp) => {
  return {
    method: 'post',
    url: 'control',
    data: {
      device,
      command: `${temp}C`
    },
  };
};

export const getSuccessMsg = (temp) => {
  return `Temperature setting is ${temp}℃ now`;
};

export default getTempConfig;
