import { combineReducers } from "redux";
import users from "./users";
import todos from "./todos";

const allReducers = combineReducers({
  users,
  todos,
});

export default allReducers;
