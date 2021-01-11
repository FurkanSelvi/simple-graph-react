import React, { useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';
import Home from './home'
import Detail from './detail'

const ChartPage = () => (
    <Switch>
      <Route path={'/detail/:id'} component={Detail} />
      <Route path={'/'} component={Home} />
    </Switch>
  );

export default ChartPage;
