import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./component/Admin";
import Detail from "./component/Detail";
import Blog from "./component/Blog";
import Error from "./component/Error";
import Login from "./component/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Blog} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/detail/:title" component={Detail} />
            <Route exact path="/admin" component={Admin} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
