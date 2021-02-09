import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./component/Admin";
import Detail from "./component/Detail";
import Blog from "./component/Blog";
import Error from "./component/Error";
import Login from "./component/Login";
import CheckLogin from "./component/CheckLogin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route exact path="/" component={CheckLogin(Blog, false)} />
            <Route exact path="/signin" component={CheckLogin(Login, false)} />
            <Route
              exact
              path="/detail/:title"
              component={CheckLogin(Detail, false)}
            />
            <Route exact path="/admin" component={CheckLogin(Admin, true)} />
            <Route
              exact
              path="/admin/:page"
              component={CheckLogin(Admin, true)}
            />
            <Route exact path="/:admin" component={CheckLogin(Blog, true)} />

            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
