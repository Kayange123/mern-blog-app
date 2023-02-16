import React, { useEffect } from "react";
import Blog from "../Blog";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../actions";
const PopularBlogs = () => {
  const { blogs } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  //console.log(blogs);
  useEffect(() => {
    // dispatch(getPosts());
  });
  return (
    <div>
      this is the popular page
    </div>
  );
};

export default PopularBlogs;
