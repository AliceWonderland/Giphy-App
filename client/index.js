// CLIENT ENTRY FILE

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { giphyApp } from './store';
import '../public/styles.scss';


import { Giphy, App, Header, Reddit } from './components';

let store = createStore(giphyApp);
import { history } from './history.js';

ReactDOM.render(
  <Provider store={store}>
      <Router path="/" history={history}>
          <div className="App">
              <Header path={window.location.href} />
              <Switch>
                  <Route exact path="/" component={Reddit} />
                  <Route exact path="/giphy" component={Giphy} />
                  <Route exact path="/reddit" component={Reddit} />
                  <Route component={Reddit} />
                  <Route path='*' component={Reddit} />
              </Switch>
          </div>
      </Router>
  </Provider>,
  document.getElementById('app')
);

