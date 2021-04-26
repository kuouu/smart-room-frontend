import dayjs from 'dayjs';
import { DATE_FORMAT } from '../Constant/EnvConstants';
import rangeProp from '../Constant/StatisticsConstants';

export const route2Name = (route) => {
  return route.replaceAll('_', ' ');
};

export const name2Route = (name) => {
  return name.replaceAll(' ', '_');
};

export const round = (value, digit = 2) => {
  const base = 10 ** digit;
  return Math.round((value + Number.EPSILON) * base) / base;
};

export const filterListByUniqueKey = (data, key) => {
  /*
  This function is used to handle the list like:
  ```
  [
    {
        "name": "Thermo Sensor 4",
        "type": "Pixi-HT",
        "floor": 2,
        "status": "ON",
        "extras": {
            "temperature": 19.55
        }
    },
    {
        "name": "Thermo Sensor 4",
        "type": "Pixi-HT",
        "floor": 2,
        "status": "ON",
        "extras": {
            "humidity": 66.85
        }
    },
  ]
  Only one "Thermo Sensor 4" is needed.
  ```
  */
  return [...new Map(data.map((x) => [key(x), x])).values()];
};

export const getStartEndDate = (range) => {
  const date = dayjs();
  const generateStartEnd = (day) => {
    return [
      day.startOf('day').utc().format(DATE_FORMAT.concat('THH:mm')),
      day.endOf('day').utc().format(DATE_FORMAT.concat('THH:mm')),
    ];
  };
  switch (range) {
    case rangeProp.Yesterday.name:
      return generateStartEnd(date.add(-1, 'days'));
    case rangeProp.Monthly.name:
      return [
        date.startOf('month').format(DATE_FORMAT).concat('T00:00'),
        date.endOf('month').format(DATE_FORMAT).concat('T23:00'),
      ];
    default:
      return generateStartEnd(date);
  }
};

export const findFirstMatch = (data, attribute, value) => {
  return data.find((v) => v[attribute] === value);
};

export const padArray = (array, length, fill) => {
  return array.concat(Array(length).fill(fill)).slice(0, length);
};

export const parseTempData = (dataArray, quantity, TempIdx = 2) => {
  const parse = (dataStr) => {
    return parseFloat(dataStr.split(',')[TempIdx]);
  };

  return padArray(dataArray.map(parse), quantity, 'NaN');
};

export const aggregateTempData = (
  dataArray,
  DateIdx = 0,
  CountIdx = 1,
  TempIdx = 2,
) => {
  /*
    Get the average temperature of a day from hourly temperature data
    The following shows the example of data from api:
    ```
    [
    "2020-11-24 01:00:00,0.83,24.7",
    "2020-11-24 02:00:00,0.76,26.0",
    "2020-11-24 03:00:00,0.69,27.9",
    "2020-11-24 04:00:00,0.67,27.6",
    "2020-11-24 05:00:00,0.6,29.4",
    "2020-11-25 05:00:00,0.6,29.4"
    ]
    ```
    the format is: <date>,<humidity>,<temperature>

    Since the data may not be complete (just like the example),
    this function is used to handle this situation and
    compute the average temperature.

    the return format is: <date>,<count>,<sum or average>

    First, if the date of the current value is
    on the same day compared with previous one,
    function will sum up and increase the count, like:
    ```
    [
    "2020-11-24 01:00:00,5,135.6",
    ]
    ```
    Then, if the date of current value is not
    on the same day compared with previous one,
    the average of the previous day will be calculated and
    append the current value to the list, like:
    ```
    [
    "2020-11-24 01:00:00,5,27.12",
    "2020-11-25 05:00:00,1,29.4"
    ]
    ```
    Finally, this function will return the average temperature
    of all day in the original list.
  */

  const aggregate = (acc, currValue, currIdx, arr) => {
    const lastIdx = acc.length - 1;
    // Break the current item string in array
    const currItem = currValue.split(',');

    if (lastIdx > -1) {
      // Get date,count,sum from
      // "<date>,<count>,<sum>" in the last item in accumulated list
      const lastItem = acc[lastIdx].split(',');
      const lastDate = dayjs(lastItem[DateIdx]);
      const count = parseInt(lastItem[CountIdx], 10);
      const sum = parseFloat(lastItem[TempIdx], 10);

      // Get date and temp from
      // "<date>,<humidity>,<temperature>" in current value
      const currDate = dayjs(currItem[DateIdx]);
      const currTemp = parseFloat(currItem[TempIdx], 10);

      if (lastDate.isSame(currDate, 'day')) {
        // Sum up the temp and increase the count if two day are same
        acc[lastIdx] = `${lastItem[DateIdx]},${count + 1},${sum + currTemp}`;
      } else {
        // Calculate the average temperature if two days are not same
        // And append the new data to accumulated list
        acc[lastIdx] = `${lastItem[DateIdx]},${count},${sum / count}`;
        acc.push(`${currItem[DateIdx]},1,${currItem[TempIdx]}`);
      }
      if (arr.length - 1 === currIdx) {
        // Handling the last item by calculating the average temperature
        acc[lastIdx] = `${lastItem[DateIdx]},${count},${sum / count}`;
      }
    } else {
      // Handling the initialization of list (first data)
      acc.push(`${currItem[DateIdx]},1,${currItem[TempIdx]}`);
    }
    return acc;
  };

  return dataArray.reduce(aggregate, []);
};

export const alignStartEndDate = (start, end) => {
  return [
    dayjs(start).add(-1, 'hour').format(DATE_FORMAT.concat('THH:mm')),
    dayjs(end).add(1, 'hour').format(DATE_FORMAT.concat('THH:mm')),
  ];
};

export const array2ObjByKey = (array, key) =>
  /*
    Convert an array to object by key,
    if the key exist in array,
    the value of corresponding key will be true
    Input:
    1. data(array):
    [
      'auto',
      'cooling',
      'heating',
      'dehumidification',
      'air-circulator',
    ]
    2. key(string): "cooling"
    
    Output(Obj):
    {
      auto: false,
      cooling: true,
      heating: false,
      dehumidification: false,
      air-circulator: false
    }
  */
  array.reduce((a, x) => ({ ...a, [x]: x === key }), {});

export const objectFlip = (obj) => {
  /*
    Flip the {key:value} pair of a object
    Example:
      Input: {'a':'b'}
      Output: {'b':'a'}
  */
  return Object.keys(obj).reduce((accumulated, key) => {
    return { ...accumulated, [obj[key]]: key };
  }, {});
};

export const filterAbnormalTemp = (temp, threshold = 35, defaultTemp = 25) => {
  // convert string to number
  let temp_num;
  if(typeof(temp) === "string"){
    temp_num = parseInt(temp, 10);
  } else {
    temp_num = temp;
  }
  // Return default temp value if temp is larger than threshold
  return temp_num < threshold ? temp_num : defaultTemp;
};

export const getObjKey = obj => 
  Object.entries(obj).find(item => item[1])[0]

export default {
  route2Name,
  name2Route,
  getStartEndDate,
  parseTempData,
  aggregateTempData,
  array2ObjByKey,
  objectFlip,
  filterAbnormalTemp,
  getObjKey
};
