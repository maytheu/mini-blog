import axios from 'axios'
import {
  ADMIN_LOGIN,
  ADMIN_AUTH,
  ADMIN_LOGOUT,
	VIEW_POST
} from "./types"
import { SERVER } from "../../component/utils/url"

export function loginAdmin(data) {
  const request = axios
    .post(`${SERVER}sign_in`, data)
    .then(response => response.data);

  return {
    type: ADMIN_LOGIN,
    payload: request
  };
}

export function authAdmin() {
  const request = axios
    .get(`${SERVER}auth`)
    .then(response => response.data);

  return {
    type: ADMIN_AUTH,
    payload: request
  };
}

export function logoutAdmin() {
  const request = axios
    .get(`${SERVER}sign_out`)
    .then(response => response.data);

  return {
    type: ADMIN_LOGOUT,
    payload: request
  };
}

export function viewPost() {
  const request = axios.get(`${SERVER}view`)
    .then(response => response.data);

  return {
    type: VIEW_POST,
    payload: request
  };
}
