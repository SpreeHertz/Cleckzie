import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard';
import { Commands } from './pages/Commands';

function App() {
  return (
    <div>
      <Switch>
      <Route path="/dashboard" exact={true} component={DashboardPage} />
      <Route path="/commands" exact={true} component={Commands} />
      </Switch>
    </div>
  );
}

export default App;
