import {
  DELETE_COMMENT,
  DELETE_POST,
  DETAILED_POST,
  DISLIKE,
  EDIT_POST,
  LIKE,
  POST,
  POST_COMMENT,
  VIEW_POST,
} from "../actions/types";

const initialization = {
  post: {},
};

export default function (state = initialization, action) {
  switch (action.type) {
    case VIEW_POST:
      return { ...state, post: action.payload };
    case DETAILED_POST:
      return { ...state, post: action.payload };
    case DELETE_POST:
      return { ...state, post: action.payload };
    case POST:
      return { ...state };
    case DELETE_COMMENT:
      return { ...state, comment: action.payload };
    case EDIT_POST:
      return { ...state, post: action.payload };
    case POST_COMMENT:
      return { ...state, comment: action.payload };
    case LIKE:
      return { ...state };
    case DISLIKE:
      return { ...state };
    default:
      return state;
  }
}
