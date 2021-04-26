const MeterConstants = {
  power: {
    name: 'Power',
    type: 'smart',
    unit: ' kWh',
    color: '#813777',
    process: (value) => {
      return value / 1000;
    },
    barColor: 'rgba(129, 55, 119, 0.9)',
  },
  gas: {
    name: 'Gas',
    type: 'gas',
    unit: ' m³',
    color: '#8F6F24',
    process: (value) => {
      return value;
    },
    barColor: 'rgba(143, 111, 36, 0.9)',
  },
  water: {
    name: 'Water',
    type: 'water',
    unit: ' m³',
    color: '#375281',
    process: (value) => {
      return value;
    },
    barColor: 'rgba(55, 82, 129, 0.9)',
  },
};

export default MeterConstants;
