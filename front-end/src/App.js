import React from 'react';
import './App.css';
import MyLayout from './Layout';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { tablesReducer } from './data/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let storeConfig = createStore(tablesReducer, composeEnhancers());

function App() {
  return (
    <div className="App">
      <Provider store={storeConfig}>
        <MyLayout></MyLayout>
      </Provider>
    </div>
  );
}

export default App;
