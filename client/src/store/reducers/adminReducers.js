import {
  ADMIN_LOGIN,
  ADMIN_AUTH,
  ADMIN_LOGOUT,
	VIEW_POST
} from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state };
    case ADMIN_AUTH:
      return { ...state };
    case ADMIN_LOGOUT:
      return { ...state };
	  case VIEW_POST:
		  return { ...state, post: action.payload}
	  default:
		  return state
  }
}
