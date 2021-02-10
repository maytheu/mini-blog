import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import {
  deleteComment,
  deletePost,
  detailedPost,
  dislike,
  like,
  postComment,
} from "../store/actions/blogActions";
import Formfield from "./utils/Formfield";
import { checkValidity } from "./utils/checkValidity";

class Detail extends Component {
  state = {
    isLoading: true,
    isAdmin: false,
    editorState: EditorState.createEmpty(),
    convertedContent: null,
    comment: "",
    data: {
      commentName: {
        type: "text",
        name: "commentName",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  componentDidMount() {
    document.title = this.props.location.state.title;
    console.log(this.props.location.state);
    this.props
      .dispatch(detailedPost(this.props.location.state.id))
      .then((response) => {
        console.log(response);
        this.setState({ isLoading: false });
      });
  }

  dislikeHandler = () => {
    this.props
      .dispatch(dislike(this.props.location.state.title))
      .then((response) => {
        if (response.payload.success) {
        }
      });
  };

  likeHandler = () => {
    this.props.dispatch(like(this.props.location.state.title));
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

  deleteCommentHandler = (id) => {
    console.log(this.props.location.state.id);

    this.props.dispatch(deleteComment(this.props.location.state.id, id));
  };

  // shareButton = () =>{

  // }

  createHTMLMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  changeSetEditorState = (editorState) => {
    this.setState({ editorState });
    this.convertContentToHTML();
  };

  convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(
      this.state.editorState.getCurrentContent()
    );
    this.setState({ convertedContent: currentContentAsHTML });
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
    // }

    this.setState({ data: updatedOrderForm, isValidForm: formValid });
  };

  inputText = (e) => {
    this.setState({ comment: e.target.value });
  };

  submitComment = (event, id) => {
    event.preventDefault();
    console.log(id);
    this.setState({ isLoading: true });
    console.log(id);
    let submit = {};
    let valid = this.state.data.commentName.valid && this.state.comment !== "";
    let timestamp = new Date();
    submit = {
      commentName: this.state.data.commentName.value,
      comment: this.state.comment,
      commentDate: timestamp.getTime(),
    };
    console.log(submit);
    if (valid) {
      this.props.dispatch(postComment(id, submit)).then((response) => {
        console.log(response);
        this.setState({ isLoading: false });
      });
    }
  };

  render() {
    let user = this.props.isAdmin.user.isUser;
    let post = this.state.isLoading ? (
      <div className="loading"></div>
    ) : (
      <div>
        <h3>{this.props.isBlog.post.post.title}</h3>
        <div
          dangerouslySetInnerHTML={this.createHTMLMarkup(
            this.props.isBlog.post.post.blog
          )}
        />
      </div>
    );

    let viewComment =
      this.props.location.state.comment.length > 0
        ? this.props.location.state.comment
            .map((comment) => {
              return (
                <div key={comment.commentId} className="main">
                  {user ? (
                    <div>
                      <div
                        onClick={() =>
                          this.deleteCommentHandler(comment.commentId)
                        }
                      >
                        {console.log(comment.id)}
                        {comment.comment}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {comment.comment}
                      {console.log("no user")}
                    </div>
                  )}
                </div>
              );
            })
            .reverse()
        : "";

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
            <div className="share" onClick={this.shareButton}>
              <FacebookShareButton
                url={this.props.isBlog.post.url}
                quote={this.props.location.state.title}
              >
                <FacebookIcon size={18} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={this.props.isBlog.post.url}>
                <TwitterIcon size={18} round={true} />
              </TwitterShareButton>
              <LinkedinShareButton
                url={this.props.isBlog.post.url}
                title={this.props.location.state.title}
              >
                <LinkedinIcon size={18} round={true} />
              </LinkedinShareButton>
              <WhatsappShareButton
                url={this.props.isBlog.post.url}
                title={this.props.location.state.title}
              >
                <WhatsappIcon round={true} size={18} />
              </WhatsappShareButton>
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
      </div>
    ) : (
      ""
    );

    let newComment = (
      <div className="main">
        <form
          onSubmit={(event, id) =>
            this.submitComment(event, this.props.location.state.id)
          }
        >
          <div className="flex-center flex-column">
            <Formfield
              id={"commentName"}
              type={this.state.data.commentName.type}
              placeholder={"Input your name"}
              name={this.state.data.commentName.name}
              value={this.state.data.commentName.value}
              change={(element) => this.inputValue(element)}
            />
            <textarea
              placeholder={"Typre your comment here"}
              rows={7}
              column={50}
              value={this.state.comment}
              onChange={this.inputText}
            />
            <button
              className="btn"
              type="submit"
              onClick={(event, id) =>
                this.submitComment(event, this.props.location.state.id)
              }
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    );

    return (
      <div>
        <div className="main">
          <div className="flex-center flex-column">{post}</div>
        </div>
        {likes}
        <div className="flex-center flex-column">{viewComment}</div>
        {newComment}
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
