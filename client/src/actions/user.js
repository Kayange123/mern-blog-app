import * as api from "../apis/index";
import { GET_BLOGS_BY_USER, GET_USER_BY_ID } from "../constants/actionTypes";

export const fetchUserById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserById(id);
    dispatch({ type: GET_USER_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchBlogsByUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getBlogsByUser(id);
    dispatch({ type: GET_BLOGS_BY_USER, data });
  } catch (error) {
    console.log(error);
  }
};
