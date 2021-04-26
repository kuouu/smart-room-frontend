import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Route, Switch } from 'react-router-dom';
import theme from './theme';
import Login from './Views/Login';
import Statistics from './Views/Statistics';
import Home from './Views/Home';
import OperationStatus from './Views/OperationStatus';
import Floor from './Views/Floor';
import AirConditionerControl from './Views/Control/AirConditioner';
import LightControl from './Views/Control/Light';
import RangeHoodControl from './Views/Control/RangeHood';
import Sensor from './Views/Sensor';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/statistics" component={Statistics} />
        <Route
          exact
          path="/operation-status"
          render={() => <OperationStatus spacing={5} />}
        />
        <Route exact path="/home/:floor" render={() => <Floor spacing={4} />} />
        <Route path="/home/:floor/ac/:name" component={AirConditionerControl} />
        <Route path="/home/:floor/light/:name" component={LightControl} />
        <Route path="/home/:floor/hood/:name" component={RangeHoodControl} />
        <Route path="/home/:floor/sensor/:name" component={Sensor} />
        <Route component={Login} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
