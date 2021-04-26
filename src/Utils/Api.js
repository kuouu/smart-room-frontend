export const getExtras = (data, attribute) => {
  /*
      <data> should be like:
      {
        "name": "Thermo Sensor 4",
        "type": "Pixi-HT",
        "floor": 2,
        "status": "OFF",
        "extras": {
            "temperature": 20.81
        }
    },
    {
        "name": "Thermo Sensor 4",
        "type": "Pixi-HT",
        "floor": 2,
        "status": "OFF",
        "extras": {
            "humidity": 69.45
        }
    },

    Desired data ("temperature" and "humidity") is in different object
    getExtras(data, type) is specific to get the desired attribute from "extras"
    For the attribute doesn't exist in object, 'undefined' will be returned
  */
  return data
    .map((item) => item.extras[attribute])
    .filter((value) => value !== undefined)[0];
};

export const addAuthHeader = (options, cookies) => {
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${cookies.access_token}`,
    },
  };
};

export default { getExtras, addAuthHeader };
