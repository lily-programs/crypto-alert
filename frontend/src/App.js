import React, { Component } from 'react';
import './App.css';
import Login from "./Login";
import Register from "./Register";
import Alerts from "./Alerts"
import ModifyAlertForm from "./ModifyAlertForm"
import CreateAlertForm from "./CreateAlertForm"
import UserInfo from "./UserInfo"
import ModifyEmailForm from "./ModifyEmailForm"

import {Router, Switch, Route} from 'react-router'
import createBrowserHistory from "history/createBrowserHistory";

const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={customHistory}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/alerts" component={Alerts} />
            <Route exact path="/alerts/:id" component={ModifyAlertForm} /> 
            <Route exact path="/createAlert" component={CreateAlertForm} />
            <Route exact path="/userInfo" component={UserInfo} />
            <Route exact path="/users/:id/changeEmail" component={ModifyEmailForm} />
          </Switch>
      </Router>
    );
  }
}

export default App
