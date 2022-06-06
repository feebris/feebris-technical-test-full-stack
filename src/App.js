import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Patient from './Patient';

const App = () => (
  <Router>
    <Switch>
      <Route path="/patients/:patientId">
        <Patient />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
