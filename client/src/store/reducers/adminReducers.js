import {
  ADMIN_LOGIN,
  ADMIN_AUTH,
  ADMIN_LOGOUT
} from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state };
    case ADMIN_AUTH:
      return { ...state };
    case ADMIN_LOGOUT:
      return { ...state };
	  default:
		  return state
  }
}
