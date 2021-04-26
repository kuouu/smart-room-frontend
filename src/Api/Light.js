export const getIlluConfig = (location, name, level) => {
  return {
    method: 'post',
    url: '/v1/hems',
    data: {
      location,
      name,
      action: { level },
    },
  };
};

export const getSuccessMsg = (level) => {
  return `Illuminance level is ${level}% now`;
};

export default { getIlluConfig, getSuccessMsg };
