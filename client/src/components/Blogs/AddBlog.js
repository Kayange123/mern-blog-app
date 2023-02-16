import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions";
import { Container } from "@material-ui/core";
const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newPost = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"))?.result?._id;
  const [inputs, setInputs] = useState({
    title: "",
    article: "",
    imageURL: "",
    tags: [],
  });
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blogs/create", {
      title: inputs.title,
      article: inputs.article,
      bannerImage: inputs.imageURL,
      tags: inputs.tags,
      user,
    });
    const data = await res.data;

    return { data, res };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => setInputs(data))
      .then(() => navigate("/blogs"));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Container className="container card">
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Toolbar className="card">
            <Typography className="card-title mt-2">Post your blog</Typography>
            <div className="form-group">
              <FileBase
                className="form-control"
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setInputs({ ...inputs, imageURL: base64 })
                }
              />
            </div>
            <TextField
              className="form-control mt-2"
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.title}
            />
            <TextField
              label="Article"
              name="article"
              variant="outlined"
              className="form-control mt-2"
              multiline
              rows={4}
              fullWidth
              onChange={handleChange}
              value={inputs.article}
            />
            <TextField
              label="Tags"
              name="tags"
              variant="standard"
              placeholder="comma separated tags"
              className="form-control mt-2"
              fullWidth
              onChange={handleChange}
              value={inputs.tags}
            />

            <Button
              type="submit"
              variant={"contained"}
              className="btn btn-success mt-2"
              fullWidth
            >
              Publish
            </Button>
          </Toolbar>
        </form>
      </Container>
    </div>
  );
};

export default AddBlog;
