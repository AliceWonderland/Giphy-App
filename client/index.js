// CLIENT ENTRY FILE

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { giphyApp } from './store';
import '../public/styles.css';


import { Home } from './components';

let store = createStore(giphyApp);

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app')
);