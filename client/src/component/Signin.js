import "./blog.css"
import React, { Component } from "react";
import axios from "axios"
import { connect } from "react-redux";

import Formfield from "./utils/Formfield"
import { checkValidity } from "./utils/checkValidity"

class Signin extends Component {
	state = {
		data:{
			user:{
				type:"text",
				name:"username",
				value:"",
				validation:{
					required: true
				},
				valid: false
			},
			password:{
				type:"password",
				value:"",
				validation:{
					required:true,
					minLength: 8
				},
				valid: false
			},
			success: ""
		},
		loading: false
	}

	submitForm = event =>{
		event.preventDefault()
		this.setState =({ loading: true})
		
	}

  render() {
	  const state = this.state.data
    return (
            <div className="main">
            <div className="flex-center flex-colum
n">
	    <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login to Post or Edit</h2>
            <Formfield type={state.user.type} placeholder={state.user.name} name={state.user.name} />
            <Formfield type={state.password.type} placeholder={state.password.type} name={state.password.name} />
	    <button onClick={this.submitForm} className="btn" type="submit">Login</button>
	    </form>
            </div>
            </div>
    )
  }
}



export default connect()(Signin)
