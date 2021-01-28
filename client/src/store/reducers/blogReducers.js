import { DETAILED_POST, VIEW_POST } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case VIEW_POST:
      return { ...state, post: action.payload };
    case DETAILED_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
}
