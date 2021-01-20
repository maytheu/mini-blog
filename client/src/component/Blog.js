import "./blog.css"
import React, { Component } from "react";
 import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Admin from "./Admin"
import Detail from "./Detail"
import Signin from "./Signin" 

class Blog extends Component {
  render() {
    return (
	    <Router>
	    <div className="main">
	    <div className="flex-center flex-column">
	    <h1>Welcome to my Blog</h1>
	    <div className="post">
	    <div className="title">
	    <Link to="/title">Title</Link>
	    </div>
	    <div className="content">
	    latest news from arsenal fc
	    </div>
	    </div>
	    </div>
	    </div>
	    <Switch>
	    <Route exact path="/title" component={Detail}/>
	    <Route exact path="/signin" component={Signin}/>
	    <Route exact path="/admin" component={Admin} />
	    </Switch>
	    </Router>
    )
  }
}

export default Blog
