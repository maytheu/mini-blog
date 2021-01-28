import { combineReducers } from "redux";

import adminReducers from "./adminReducers";
import blogReducers from "./blogReducers";

const rootReducer = combineReducers({
  admin: adminReducers,
  blog: blogReducers
});

export default rootReducer;
