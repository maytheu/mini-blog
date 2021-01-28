import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import { detailedPost } from "../store/actions/blogActions";
import { authAdmin } from "../store/actions/adminActions";

class Detail extends Component {
  state = {
    isLoading: true,
    isAdmin: false,
  };
  componentDidMount() {
    this.props
      .dispatch(detailedPost(this.props.match.params.title))
      .then((response) => {
        this.setState({ isLoading: false });
      });
    this.props
      .dispatch(authAdmin())
      .then((response) => this.setState({ isAdmin: response.payload.isAuth }));
  }
  render() {
    let blog = this.props.isBlog.post.post;
    let post = this.state.isLoading ? (
      <div className="loading"></div>
    ) : (
      <div>
        <h3>{blog.title}</h3>
        <div>{blog.blog}</div>
      </div>
    );
    return (
      <div className="main">
        <div className="flex-center flex-column">
          {post}
          {this.state.isAdmin ? <div>add edit abd delete fir user</div> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isBlog: state.blog,
  };
};

export default connect(mapStateToProps)(Detail);
