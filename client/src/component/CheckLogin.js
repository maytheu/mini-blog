import React, { Component } from "react";
import { connect } from "react-redux";

import { authAdmin } from "../store/actions/adminActions";

export default function(ComposedClass, reload) {
  class CheckLogin extends Component {
    state = {
      isLoading: true
    }; 

    componentDidMount() {
      this.props.dispatch(authAdmin()).then(() => {
        let admin = this.props.isAdmin.user;
        console.log(admin)
        if (!admin.isUser) {
          if (reload) { 
            this.props.history.push("/signin");
          } 
        } 
        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="loader">
lpwfotm          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.isAdmin} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAdmin: state.admin
    };
  }

  return connect(mapStateToProps)(CheckLogin);
}