import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import {
  DeleteForever,
  Edit,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../actions";
import { Toolbar } from "@material-ui/core";
const Blog = ({ blog, isUser, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  
  const handleLike = () => {
    dispatch(likePost(blog._id));
    setIsLiked((prevState) => !prevState);
  };
  const handleDelete = () => {
    dispatch(deletePost(blog._id));
  };
  return (
    <Card
      sm={{
        maxWidth: "100%",
      }}
      sx={{
        maxWidth: "80%",
        margin: "8px auto",
        border: "1px solid white",
      }}
      display="flex"
    >
      {isUser && (
        <Toolbar size="small" display="flex">
          <Button variant="contained" onClick={() => navigate(`/blogs/${id}`)}>
            <Edit />
          </Button>
          <Button variant="contained" color="warning" onClick={handleDelete}>
            <DeleteForever />
          </Button>
        </Toolbar>
      )}
      <CardHeader
        sx={{ color: "#000" }}
        avatar={
          <Avatar sx={{ bgcolor: "grey" }}>{blog.user.name.charAt(0)}</Avatar>
        }
        title={blog.title}
      />
      <CardMedia
        className="img-fluid"
        component="img"
        image={blog.bannerImage}
        alt={blog.title}
      />
      <CardContent>
        <Typography>{blog.tags.map((tag) => `#${tag}, `)}</Typography>
        <Typography
          sx={{ color: "#000" }}
          variant="body2"
          color="textSecondary"
          gutterBottom
        >
          <b onClick={() => navigate("/user/profile")}>{blog.user.name}</b>{" "}
          {": "}
          {blog.article}
        </Typography>
        <Typography
          sx={{ color: "black", fontStyle: "italic" }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Published: - {moment(blog.publishedAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLike}>
          {isLiked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
        </Button>
        {blog.likeCount} &nbsp;
        {blog.likeCount === 0 ? " Like" : " Likes"}
      </CardActions>
    </Card>
  );
};

export default Blog;
