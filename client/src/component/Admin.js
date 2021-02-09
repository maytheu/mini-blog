import "./blog.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import axios from "axios";

import Formfield from "./utils/Formfield";
import { checkValidity } from "./utils/checkValidity";
import Wysiwyg from "./Wysiwyg";
import { editPost, post } from "../store/actions/blogActions";
import { SERVER } from "./utils/url";

class Admin extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    convertedContent: null,
    page: "Add New Post",
    isLoading: false,
    url: "",
    imageUpload: "",
    progress: 0,
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
    },
    success: "",
  };

  updateField = (data, editorState) => {
    const newFormData = { ...this.state.data };
    for (let key in newFormData) {
      newFormData[key].value = data[key];
      newFormData[key].valid = true;
    }

    this.setState({
      data: newFormData,
      editorState,
    });
  };

  componentDidMount() {
    document.title = this.state.page;
    if (this.props.match.params.page !== undefined) {
      let page = this.props.match.params.page;
      this.setState({ page: `Edit ${page}` });
      document.title = "Edit Post";
      console.log(this.props.isBlog.post.post);
      let editorState = EditorState.createWithContent(
        convertFromHTML(this.props.isBlog.post.post.blog)
      );
      this.updateField(this.props.isBlog.post.post, editorState);
      console.log(this.state);
    }
  }

  changeSetEditorState = (editorState) => {
    this.setState({
      editorState,
    });
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
    // for(let keyInput in updatedOrderForm){
    formValid = updatedOrderForm[element.id].valid && formValid;
    // }

    this.setState({ data: updatedOrderForm, isValidForm: formValid });
  };

  uploadFile = (event) => {
    console.log("files");
    this.setState({ imageUpload: event.target.files[0] });
    console.log(this.state.imageUpload);
  };

  submitForm = (event, id) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let submit = {};
    let validForm = true;
    for (let key in this.state.data) {
      console.log(this.state.data[key]);
      submit[key] = this.state.data[key].value;
      validForm = this.state.data[key].valid && validForm;
    }

    let timeStamp = new Date();
    let submitDetails = {
      title: submit.title,
      headline: submit.headline,
      publish: submit.publish,
      blog: this.state.convertedContent,
      publishedDate: timeStamp.getTime(),
    };
    console.log(submitDetails);
    if (validForm) {
      if (this.state.page === "Add New Post") {
        this.props.dispatch(post(submitDetails)).then((response) => {
          if (response.payload.success) {
            this.setState({ isLoading: false });
            this.props.history.push("/user");
          } else {
            this.setState({
              isLoading: false,
              success: "Post Not Saved, Review Your Post",
            });
          }
        });
      } else {
        this.props.dispatch(editPost(submitDetails, id)).then((response) => {
          if (response.payload.success) {
            this.setState({ isLoading: false });
            this.props.history.push("/user");
          } else {
            this.setState({
              isLoading: false,
              success: "Post Not Edited, Review Your Post",
            });
          }
        });
      }
    }
  };

  progressEvent = () => {
    this.setState((ProgressEvent) => {
      return {
        progress:
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%",
      };
    });
  };

  submitImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.imageUpload);
    console.log(data);

    axios
      .post(`${SERVER}user/upload`, data, {
        onUploadProgress: this.progressEvent(),
      })
      .then((response) => {
        this.setState({ url: response.data.url });
      });
  };

  render() {
    const state = this.state.data;
    console.log(this.state.editorState);
    console.log(this.state.convertedContent);
    return (
      <div className="main">
        <div className="flex-center flex-column">
          <h2>{this.state.page}</h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>
              <Formfield
                id={"title"}
                type={state.title.type}
                placeholder={state.title.name}
                name={state.title.name}
                value={state.title.value}
                change={(element) => this.inputValue(element)}
              />
              <Formfield
                id={"headline"}
                type={state.headline.type}
                placeholder={state.headline.type}
                name={state.headline.name}
                value={state.headline.value}
                change={(element) => this.inputValue(element)}
              />
              <Formfield
                id={"publish"}
                type={state.publish.type}
                placeholder={state.publish.name}
                name={state.publish.name}
                value={state.publish.value}
                change={(element) => this.inputValue(element)}
              />
              <Wysiwyg
                editorState={this.state.editorState}
                setEditorState={this.changeSetEditorState}
              />
              {this.state.page === "Add New Post" ? (
                <button
                  className="btn"
                  type="submit"
                  onClick={(event, id) => this.submitForm(event)}
                >
                  Post Article
                </button>
              ) : (
                <button
                  className="btn"
                  type="submit"
                  onClick={(event, id) =>
                    this.submitForm(event, this.props.isBlog.post.post._id)
                  }
                >
                  Edit Article
                </button>
              )}
            </form>
            <form onSubmit={(event) => this.submitImage(event)}>
              <input type="file" name="file" onChange={this.uploadFile} />

              <button
                className="btn"
                onSubmit={(event) => this.submitImage(event)}
              >
                Get Image UrlI
              </button>
            </form>
            <div>{this.state.url}</div>
          </div>
        </div>
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

export default connect(mapStateToProps)(Admin);
