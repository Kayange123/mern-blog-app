import axios from "axios";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const fetchData = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blogs/update/${id}`, {
        title: inputs.title,
        article: inputs.article,
        tags: inputs.tags,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/blogs"));
  };
  useEffect(() => {
    fetchData().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: blog.data.title,
        article: blog.data.article,
        tags: blog.data.tags,
      });
    });
  });

  return (
    <div>
      {inputs && (
        <Paper>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box className="card">
              <Typography>Edit your blog</Typography>

              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setInputs({ ...inputs, title: e.target.value })
                }
                value={inputs.title}
              />
              <TextField
                label="Article"
                name="article"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setInputs({ ...inputs, article: e.target.value })
                }
                value={inputs.article}
              />
              <TextField
                label="Tags"
                name="tags"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setInputs({ ...inputs, tags: e.target.value.split(" ") })
                }
                value={inputs.tags}
              />

              <Button type="submit" variant="contained" size="large">
                Publish
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </div>
  );
};

export default BlogDetails;
