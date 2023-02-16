import { Container, ListItemAvatar, Toolbar } from "@material-ui/core";
import {
  Facebook,
  Google,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchBlogsByUser, fetchUserById } from "../../actions/user";

const User = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.userData?.user);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState(user?.blogs);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(id));
    }
    setBlogs(user?.blogs);
  }, [id, dispatch, location, user]);

  console.log(user);
  console.log(blogs);
  return (
    <Container style={{ marginTop: "10vh" }}>
      {user ? (
        <Container>
          <Typography>Hello there welcome to the official page of </Typography>
          {user?.name}
        </Container>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </Container>
  );
};

export default User;
