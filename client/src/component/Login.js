import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import Formfield from "./utils/Formfield";
import { checkValidity } from "./utils/checkValidity";

class Signin extends Component {
  state = {
    data: {
      user: {
        type: "text",
        name: "username",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      password: {
        type: "password",
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
      },
      success: "",
    },
    loading: false,
  };

  inputValue = (event, element) => {
    const formCopy = {
      ...this.state.data.element,
      [element]: {
        ...this.state.data.element,
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.data[element].validation
        ),
      },
    };
    this.setState({data: formCopy})
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState = { loading: true };
  };

  render() {
    const state = this.state.data;
    return (
      <div className="main">
        <div
          className="flex-center flex-colum
n"
        >
          <form onSubmit={(event) => this.submitForm(event)}>
            <h2>Please Login to Post or Edit</h2>
            <Formfield
              type={state.user.type}
              placeholder={state.user.name}
              name={state.user.name}
              value={state.user.value}
              change={(event) => this.inputValue(event, "user")}
            />
            <Formfield
              type={state.password.type}
              placeholder={state.password.type}
              name={state.password.name}
              value={state.user.value}
              change={(event) => this.inputValue(event, "password")}
            />
            <button onClick={this.submitForm} className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Signin);
