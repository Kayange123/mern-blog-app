import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "../reducers/index";
import { api } from "../reducers/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore(
  {
    reducer: reducers,
    middleware: (getDefault) => getDefault().concat(api.middleware),
  },
  compose(applyMiddleware(thunk))
);
setupListeners(store.dispatch);
