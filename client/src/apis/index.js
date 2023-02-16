import axios from "axios";
const url = "http://localhost:5000/api";
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get(`/blogs`);
export const createPost = (post) => API.post(`/blogs/create`, post);
export const editPost = (id, post) => API.patch(`/blogs/update/${id}`, post);
export const deletePost = (id) => API.delete(`/blogs/delete/${id}`);
export const likePost = (id) => API.patch(`/blogs/${id}/like`);

//User's apis
export const signin = (postData) => API.post(`/users/signin`, postData);
export const signup = (postData) => API.post(`/users/signup`, postData);
export const getUserById = (id) => API.get(`/users/profile/${id}`);
export const updateProfilePhoto = (id, photo) =>
  API.put(`/users/profile/${id}/changeprofile`, photo);
export const getBlogsByUser = (id) => API.get(`/blogs/user/${id}`);
