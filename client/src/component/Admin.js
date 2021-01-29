import "./blog.css";
import React, { Component } from "react";
import {connect} from 'react-redux'

import Formfield from "./utils/Formfield";
import { checkValidity } from "./utils/checkValidity";

class Admin extends Component {
  state = {
    page: "Add New Post",
    data: {
      title: {
        type: "text",
        name: "title",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      headline: {
        type: "text",
        value: "",
        name: "headline",
        valid: false,
      },
      publish: {
        type: "text",
        value: "",
        name: "Enter 1 to publish",
        validation: {
          required: true,
        },
        valid: "false",
      },
      blog: {
        type: "text",
        value: "",
        name: "Enter blog",
        validation: {
          required: true,
        },
        valid: "false",
      },
      success: "",
    },
  };

  componentDidMount(){
	  if(this.props.match.params.title !== undefined){
	  let page = this.props.match.params.title
	  this.setState({page: `Edit ${page}`})
	  }
  }
  render() {
    const state = this.state.data;
    return (
      <div className="main">
        <div
          className="flex-center flex-colum
n"
        >
          <h2>{this.state.page}</h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>
              <Formfield
                type={state.title.type}
                placeholder={state.title.name}
                name={state.title.name}
              />
              <Formfield
                type={state.headline.type}
                placeholder={state.headline.type}
                name={state.headline.name}
              />
              <Formfield
                type={state.publish.type}
                placeholder={state.publish.name}
                name={state.publish.name}
              />
              <Formfield
                type={state.blog.type}
                placeholder={state.blog.type}
                name={state.blog.name}
              />

              <button className="btn" type="submit">
                Post Article
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Admin);
