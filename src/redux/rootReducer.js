import { combineReducers } from "redux";
import mainReducers from "./main/mainReducer";

export default combineReducers({
  contacts: mainReducers,
});
