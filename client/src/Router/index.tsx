import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from 'Pages/Auth/Signup';
import Login from 'Pages/Auth/Login';
import Students from 'Pages/Student/AllStudents';
import Courses from 'Pages/Courses';
import oneStudent from 'Pages/Student/StudentDetails';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path= '/' component={Signup} />
        <Route exact path= '/login' component={Login} />
        <Route exact path= '/students' component={Students} />
        <Route exact path= '/courses' component={Courses} />
        <Route path= '/student/:id' component={oneStudent} />
      </Switch>
    </Router>
  );
}
