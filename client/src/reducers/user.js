import { GET_BLOGS_BY_USER, GET_USER_BY_ID } from "../constants/actionTypes";

const user = (state = { userData: [] }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return { ...state, userData: action?.data };
    case GET_BLOGS_BY_USER:
      return { ...state, userData: action?.data };
    default:
      return state;
  }
};
export default user;
