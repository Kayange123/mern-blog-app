import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "../reducers/index";

export const store = configureStore(
  { reducer: reducers },
  compose(applyMiddleware(thunk))
);
