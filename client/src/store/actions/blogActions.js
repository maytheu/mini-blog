import axios from "axios";

import { SERVER } from "../../component/utils/url";
import { DETAILED_POST, DISLIKE, LIKE, VIEW_POST } from "./types";

export function viewPost() {
  const request = axios.get(`${SERVER}view`).then((response) => response.data);

  return {
    type: VIEW_POST,
    payload: request,
  };
}

export function detailedPost(title) {
  const request = axios
    .get(`${SERVER}post?title=${title}`)
    .then((response) => response.data);

  return {
    type: DETAILED_POST,
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
