import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './../Pages/Auth/Signup';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path= '/' component={Signup} />
      </Switch>
    </Router>
  );
}
