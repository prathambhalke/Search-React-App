import { search_reducer } from "./search_reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  search: search_reducer,
});
