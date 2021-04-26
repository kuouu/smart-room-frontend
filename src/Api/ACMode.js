export const getModeConfig = (device, mode, temp) => {
  return {
    method: 'post',
    url: 'control',
    data: {
      device,
      command: mode === 'cool' ? `${temp}C` : mode
    },
  };
};

export const getSuccessMsg = (mode) => {
  const [selected] = Object.keys(mode).filter((x) => mode[x]);
  return `A/C mode is ${selected} now`;
};

export default { getModeConfig, getSuccessMsg };
