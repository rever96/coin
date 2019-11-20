import React from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import history from './history';
import ViewTable from './pages/ViewTable';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Redirect from="/" exact to="/dashboard" />
        <Route exact path="/tabella/:tableName" component={ViewTable} />
      </Switch>
    </Router>
  );
}
