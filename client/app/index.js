import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from '../components';
import {
  MoviesList,
  MoviesInsert,
  MoviesUpdate,
  HomePage,
} from '../pages/index';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path="/movies/list" exact component={MoviesList} />
      <Route path="/movies/create" exact component={MoviesInsert} />
      <Route path="/movies/update/:id" exact component={MoviesUpdate} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  </Router>
);

export { App as default };
