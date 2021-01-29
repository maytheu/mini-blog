import "./blog.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { viewPost } from "../store/actions/blogActions";

class Blog extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.props.dispatch(viewPost()).then((response) => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    let posts = !this.state.isLoading ? (
      this.props.isBlog.post.map((recent) => {
        return (
          <div key={recent._id}>
            <div className="title">
              <Link to={`/detail/${recent.title}`}>{recent.title}</Link>
            </div>
            <div className="content">{recent.headline}</div>
          </div>
        );
      })
    ) : (
      <div className="loading"></div>
    );
    return (
      <div>
        <div className="main">
          <div className="flex-center flex-column">
            <h1>Welcome to my Blog</h1>
            <div className="post">{posts}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isBlog: state.blog
  };
};

export default connect(mapStateToProps)(Blog);
