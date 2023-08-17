/* eslint-disable import/no-anonymous-default-export */
import { CREATE, DELETE, GET_POSTS, UPDATE } from "../constants/actionTypes";
export default (posts = [], action) => {
  const { blogs } = posts;
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case CREATE:
      return [...blogs, action.payload];
    case DELETE:
      return blogs.filter((post) => post._id !== action.payload);
    case UPDATE:
      return blogs.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return posts;
  }
};
