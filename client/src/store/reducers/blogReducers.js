import {
  DELETE_POST,
  DETAILED_POST,
  DISLIKE,
  LIKE,
  VIEW_ADMIN_POST,
  VIEW_POST,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case VIEW_POST:
      return { ...state, post: action.payload };
    case VIEW_ADMIN_POST:
      return { ...state, post: action.payload };
    case DETAILED_POST:
      return { ...state, post: action.payload };
    case DELETE_POST:
      return { ...state, post: action.payload };
    case LIKE:
      return { ...state };
    case DISLIKE:
      return { ...state };
    default:
      return state;
  }
}
