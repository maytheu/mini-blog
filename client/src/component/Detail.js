import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  deletePost,
  detailedPost,
  dislike,
  like,
} from "../store/actions/blogActions";

class Detail extends Component {
  state = {
    isLoading: true,
    isAdmin: false,
  };
  componentDidMount() {
    console.log(this.props.isAdmin);
    if (this.props.isAdmin.user.isUser) {
      console.log("run");
    }
    this.props
      .dispatch(detailedPost(this.props.match.params.title))
      .then((response) => {
        this.setState({ isLoading: false });
      });
  }

  dislikeHandler = () => {
    this.props.dispatch(dislike(this.props.match.params.title));
  };

  likeHandler = () => {
    this.props.dispatch(like(this.props.match.params.title));
  };

  editHandler = () => {
    this.props.history.push(`/admin/${this.props.isBlog.post.post._id}`);
  };

  deleteHandler = () => {
    console.log("delete");
    this.props.dispatch(deletePost(this.props.isBlog.post.post._id));
    console.log("delete2");
    this.props.history.push("/user");
  };

  render() {
    let post = this.state.isLoading ? (
      <div className="loading"></div>
    ) : (
      <div>
        <h3>{this.props.isBlog.post.post.title}</h3>
        <div>{this.props.isBlog.post.post.blog}</div>
      </div>
    );
    let user = this.props.isAdmin.user.isUser;
    console.log(user);
    let likes = !this.state.isLoading ? (
      <div>
        <div className="main">
          <div className="justify-center">
            <div className="share" onClick={this.likeHandler}>
              {this.props.isBlog.post.post.like}Likes
            </div>
            <div className="share" onClick={this.dislikeHandler}>
              {this.props.isBlog.post.post.dislike}DisLike
            </div>
            <div className="share" onClick={this.dislikeHandler}>
              Share
            </div>
            {user ? (
              <div>
                <div className="share" onClick={this.editHandler}>
                  add edit
                </div>
                <div className="share" onClick={this.deleteHandler}>
                  {" "}
                  delete fir user
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="main">Comment</div>
      </div>
    ) : (
      ""
    );
    return (
      <div>
        <div className="main">
          <div className="flex-center flex-column">{post}</div>
        </div>
        {likes}
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

export default connect(mapStateToProps)(Detail);
