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
import Formfield from "./utils/Formfield"

class Blog extends Component {
  render() {
    return (
	    <div>
	    <div className="main">
	    <div className="flex-center flex-column">
	    <h1>Welcome to my Blog</h1>
	    <div className="post">
	    <div className="title">
	    <Router>
	    <Link to="/title">Title</Link>
	    </Router>
	    </div>
	    <div className="content">
	    latest news from arsenal fc
	    </div>
	    </div>
	    
	
	    <Formfield type="text"  />
	    <Formfield type="password" placeholder="password"/>
	    </div>
	    </div>
	    </div>
    )
  }
}

export default Blog
