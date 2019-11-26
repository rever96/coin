import React from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import history from './history';
import ViewTable from './pages/ViewTable';
import { createStore, compose } from 'redux';
import { tablesReducer } from './data/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let storeConfig = createStore(tablesReducer, composeEnhancers());
ViewTable.defaultProps = {
  store: storeConfig
};

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
