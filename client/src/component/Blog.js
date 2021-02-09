import "./blog.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { viewAdminPost, viewPost } from "../store/actions/blogActions";
import { logoutAdmin } from "../store/actions/adminActions";

class Blog extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    document.title = "Welcome To My Blog";
    if (this.props.match.params.admin) {
      this.props.dispatch(viewAdminPost()).then((response) => {
        this.setState({ isLoading: false });
      });
    } else {
      this.props.dispatch(viewPost()).then((response) => {
        this.setState({ isLoading: false });
      });
    }
  }

  signOutHandler = () => {
    console.log("logout");
    this.props.dispatch(logoutAdmin()).then((response) => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    let signOut = this.props.match.params.admin ? (
      <div onClick={() => this.props.history.push("/admin")}>
        Add New Post
        <div onClick={this.signOutHandler}>Sign Out</div>
      </div>
    ) : (
      ""
    );

    let posts = !this.state.isLoading ? (
      this.props.isBlog.post
        .map((recent) => {
          let title = recent.title;
          title = title.replace(/\s+/g, "-").toLowerCase();
          console.log(recent);
          return (
            <div key={recent._id}>
              <div className="title">
                <Link
                  to={{
                    pathname: `/detail/${title}`,
                    state: {
                      id: recent._id,
                      title: recent.title,
                      comment: recent.comment,
                    },
                  }}
                >
                  {recent.title}
                </Link>
              </div>
              <div className="content">{recent.headline}</div>
            </div>
          );
        })
        .reverse()
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
        {signOut}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isBlog: state.blog,
    isAdmin: state.admin,
  };
};

export default connect(mapStateToProps)(Blog);
