import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './../Pages/Auth/Signup';
import Login from './../Pages/Auth/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path= '/' component={Signup} />
        <Route exact path= '/login' component={Login} />
      </Switch>
    </Router>
  );
}
