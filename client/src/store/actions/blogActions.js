import axios from "axios";

import { SERVER } from "../../component/utils/url";
import {
  DELETE_POST,
  POST,
  DETAILED_POST,
  DISLIKE,
  LIKE,
  VIEW_POST,
  EDIT_POST,
  POST_COMMENT,
  DELETE_COMMENT,
} from "./types";

export function viewPost() {
  const request = axios.get(`${SERVER}view`).then((response) => response.data);

  return {
    type: VIEW_POST,
    payload: request,
  };
}

export function viewAdminPost() {
  const request = axios
    .get(`${SERVER}user/view`)
    .then((response) => response.data);

  return {
    type: VIEW_POST,
    payload: request,
  };
}

export function deleteComment(_id, id) {
  const request = axios
    .get(`${SERVER}user/comment_delete/?id=${id}&_id=${_id}`)
    .then((response) => response.data);

  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}


export function detailedPost(id) {
  const request = axios
    .get(`${SERVER}post?id=${id}`)
    .then((response) => response.data);

  return {
    type: DETAILED_POST,
    payload: request,
  };
}

export function deletePost(id) {
  const request = axios.get(`${SERVER}user/delete?id=${id}`);

  return {
    type: DELETE_POST,
    payload: request,
  };
}

export function like(title) {
  const request = axios
    .get(`${SERVER}like?title=${title}`)
    .then((response) => response.data);

  return {
    type: LIKE,
    payload: request,
  };
}

export function dislike(title) {
  const request = axios
    .get(`${SERVER}dislike?title=${title}`)
    .then((response) => response.data);

  return {
    type: DISLIKE,
    payload: request,
  };
}

export function post(data) {
  const request = axios
    .post(`${SERVER}user/post`, data)
    .then((response) => response.data);

  return { type: POST, payload: request };
}

export function editPost(data, id) {
  const request = axios
    .post(`${SERVER}user/edit?id=${id}`, data)
    .then((response) => response.data);

  return {
    type: EDIT_POST,
    payload: request,
  };
}

export function postComment(id, data) {
  const request = axios
    .post(`${SERVER}post_comment?id=${id}`, data)
    .then((response) => response.data);

  return {
    type: POST_COMMENT,
    payload: request,
  };
}

