import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActions,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DeleteForever,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../actions";
import FlexBox from "../FlexBox";

const Blog = ({ blog, isUser, id }) => {
  const theme = useTheme();
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
      sx={{
        borderRadius: "0.55rem",
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardHeader
        sx={{ color: theme.palette.primary[200], fontSize: "3rem" }}
        avatar={
          <Avatar
            onClick={() => navigate("/user/profile")}
            variant="rounded"
            sx={{ bgcolor: theme.palette.secondary[100], cursor: "pointer" }}
          >
            {blog.user.name.charAt(0)}
          </Avatar>
        }
        title={blog.user.name}
      />
      <CardMedia
        className="img-fluid"
        component="img"
        loading="lazy"
        image={blog.bannerImage}
        alt={blog.title}
      />
      <CardContent>
        <Typography
          sx={{ color: theme.palette.primary[100], cursor: "pointer" }}
          variant="body2"
          color="textSecondary"
          gutterBottom
          onClick={() => navigate("/user/profile")}
        >
          {blog.user.name}
        </Typography>
        <Typography>{blog.article}</Typography>
        <Typography
          sx={{ color: "black", fontStyle: "italic" }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Published: - {moment(blog.publishedAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <FlexBox>
          <Tooltip title={isLiked ? "Dislike a post" : "Like a post"}>
            <Button
              size="small"
              sx={{ color: theme.palette.primary[200] }}
              onClick={handleLike}
            >
              {isLiked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
            </Button>
          </Tooltip>
          {blog.likeCount} &nbsp;
          {blog.likeCount === 0 ? " Like" : " Likes"}
        </FlexBox>
        {isUser && (
          <FlexBox>
            <Tooltip title="Delete Forever">
              <IconButton onClick={handleDelete}>
                <DeleteForever />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit post">
              <IconButton onClick={() => navigate(`/blogs/${id}`)}>
                <MoreVertOutlined />
              </IconButton>
            </Tooltip>
          </FlexBox>
        )}
      </CardActions>
    </Card>
  );
};

export default Blog;
