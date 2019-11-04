import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { NavBar } from '../components';
import {
  MoviesList,
  MoviesInsert,
  MoviesUpdate,
  HomePage,
} from '../pages/index';

import 'bootstrap/dist/css/bootstrap.min.css';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 1000,
  offset: '2.375rem',
  transition: transitions.FADE,
};

const App = () => (
  <AlertProvider
    template={AlertTemplate}
    options={options}
  >
    <Router>
      <NavBar />
      <Switch>
        <Route path="/movies/list" exact component={MoviesList} />
        <Route path="/movies/create" exact component={MoviesInsert} />
        <Route path="/movies/update/:id" exact component={MoviesUpdate} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  </AlertProvider>
);

export { App as default };
