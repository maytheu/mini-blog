import "./blog.css"
import React, { Component } from "react";
 import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { connect } from "react-redux";


import Admin from "./Admin"
import Detail from "./Detail"
import Signin from "./Signin" 
import Formfield from "./utils/Formfield"
import { viewPost } from "../store/actions/adminActions"

class Blog extends Component {
	state = {
		isLoading: true,
		page: " hhhjj"
	}

	componentDidMount() {
    this.props.dispatch(viewPost())
		.then(response => {
		
   
	   this.setState({ isLoading: false
		   });

    });
  }
  render() {
	  let posts = this.props.isBlog.post ? 
		  this.props.isBlog.post.map( recent =>{
		<div>	
				  recent.title
	</div>		  
		  })
: (                      <div className="loading">                         loader
	
                  </div>
          )
    return (
	    <div>
	    <div className="main">
	    <div className="flex-center flex-column">
	    <h1>Welcome to my Blog</h1>
	    <div className="post">
	    <div className="title">
	    <Router>
	    <Link to="/detail">Title</Link>
	    </Router>
	    </div>
	    <div className="content">
	    latest news from arsenal fc
	    </div>loading state: {this.state.isLoading}%{this.state.page}
	    {posts}
	    </div>
	
	    </div>
	    </div>
	    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isBlog: state.admin
  };
};

export default connect(mapStateToProps)(Blog)
