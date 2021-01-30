import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import Formfield from "./utils/Formfield";
import { checkValidity } from "./utils/checkValidity";
import { loginAdmin } from "../store/actions/adminActions";

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
    },
    isLoading: false,
    formValid: false,
    success: "",
  };

  inputValue = (element) => {
    const updatedOrderForm = {
      ...this.state.data,
    };
    const updatedFormElement = {
      ...updatedOrderForm[element],
    };
    updatedFormElement.value = element.event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[element.id] = updatedFormElement;

    let formValid = true;
    formValid = updatedOrderForm[element.id].valid && formValid;

    this.setState({ data: updatedOrderForm, isValidForm: formValid });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let submit = {};
    let validForm = true;
    for (let key in this.state.data) {
      submit[key] = this.state.data[key].value;
      validForm = this.state.data[key].valid && validForm;
    }
    if (validForm) {
      this.props.dispatch(loginAdmin(submit)).then((response) => {
        if (response.payload.loginSuccess) {
          this.setState({ isLoading: false });
          this.props.history.push('/user');
        } else {
          this.setState({ success: true });
        }
      });
    }
  };

  render() {
    const state = this.state.data;
    return (
      <div className="main">
        <div className="flex-center flex-column">
          <form onSubmit={(event) => this.submitForm(event)}>
            <h2>Please Login to Post or Edit</h2>
            <Formfield
              id={"user"}
              type={state.user.type}
              placeholder={state.user.name}
              name={state.user.name}
              value={state.user.value}
              change={(element) => this.inputValue(element)}
            />
            <Formfield
              id={"password"}
              placeholder={"password"}
              type={"password"}
              value={state.password.value}
              change={(element) => this.inputValue(element)}
            />
            <button
              onClick={(event) => this.submitForm(event)}
              className="btn"
              type="submit"
            >
              Login
            </button>
          </form>
          {!this.state.success ? "" : <div>Wrong username or password</div>}
        </div>
      </div>
    );
  }
}

export default connect()(Signin);
