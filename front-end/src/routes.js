import React from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import history from './history';
import ViewTable from './pages/ViewTable';
import Example from './pages/example';
import Home from './pages/home';
import selectTable from './pages/selectTable';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Redirect from="/" exact to="/dashboard" />
        <Route exact path="/table/:tableName" component={ViewTable} />
        <Route exact path="/tables/view" component={selectTable} />
        <Route exact path="/tables/add" component={selectTable} />
        <Route exact path="/example" component={Example} />
        <Route exact path="/dashboard" component={Home} />
      </Switch>
    </Router>
  );
}
