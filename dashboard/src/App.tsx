import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard';
import { Commands } from './pages/Commands';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div>
     <Sidebar guilds={[]}/>
      <Switch>
      <Route path="/dashboard" exact={true} component={DashboardPage} />
      <Route path="/commands" exact={true} component={Commands} />
      </Switch>
    </div>
  );
}

export default App;
