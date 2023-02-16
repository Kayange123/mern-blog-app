import { AUTH } from "../constants/actionTypes";
import * as api from "../apis/index";
export const signin = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(form);
    dispatch({ type: AUTH, data });
    navigate("/blogs");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(form);
    dispatch({ type: AUTH, data });
    navigate("/blogs");
  } catch (error) {
    console.log(error);
  }
};
