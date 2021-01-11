import React, { useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';
import ChartPage from '../../containers/ChartPage'

const MainBoard = () => (
    <Switch>
      <Route path={'/'} component={ChartPage} />
    </Switch>
  );

export default MainBoard;
