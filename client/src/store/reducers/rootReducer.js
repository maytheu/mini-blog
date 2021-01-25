import { combineReducers } from "redux";

import adminReducers from "./adminReducers";

const rootReducer = combineReducers({
  admin: adminReducers
});

export default rootReducer;
