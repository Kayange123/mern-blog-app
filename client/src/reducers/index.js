import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import user from "./user";
import globalSlice from "./globalSlice";
export default combineReducers({ posts, auth, user, globalSlice });
