import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Admin from "./component/Admin"
import Detail from "./component/Detail"
import Signin from "./component/Signin"
import Blog from "./component/Blog"
import Error from "./component/Error"

class App extends Component {
	render(){
  return (
	  <BrowserRouter>
    <div className="main">
      <Switch>
	  <Route exact path="/" component={Blog} exact/>
             <Route exact path="/signin" component={Signin}/>
             <Route exact path="/detail" component={Detail}/>
	  <Route exact path="/admin" component={Admin}/>
	  <Route  component={Error}/>
	  </Switch>
    </div>
	  </BrowserRouter>
  );
}
}
export default App;
