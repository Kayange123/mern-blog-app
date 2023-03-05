import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import user from "./user";
import globalSlice from "./globalSlice";
import { api } from "./api";
export default combineReducers({
  posts,
  auth,
  user,
  globalSlice,
  [api.reducerPath]: api.reducer,
});
