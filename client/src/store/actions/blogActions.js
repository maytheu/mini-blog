import axios from "axios";

import { SERVER } from "../../component/utils/url";
import { DETAILED_POST, VIEW_POST } from "./types";

export function viewPost() {
  const request = axios.get(`${SERVER}view`).then((response) => response.data);

  return {
    type: VIEW_POST,
    payload: request,
  };
}

export function detailedPost(title) {
  const request = axios.get(`${SERVER}post?title=${title}`).then((response) => response.data);

  return {
    type: DETAILED_POST,
    payload: request,
  };
}
