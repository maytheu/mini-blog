import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import { detailedPost, dislike, like } from "../store/actions/blogActions";
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

  dislikeHandler = () => {
    this.props.dispatch(dislike(this.props.match.params.title));
  };

  likeHandler = (action) => {
    this.props.dispatch(like(this.props.match.params.title));
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
            {this.state.isAdmin ? (
              <div>
                <div className="share">add edit</div>
                <div className="share"> delete fir user</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="main">Comment</div>
      </div>
    ): ''
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
  };
};

export default connect(mapStateToProps)(Detail);
