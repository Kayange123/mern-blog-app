import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DeleteOutlineOutlined,
  SendOutlined,
  Upload,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "../../../actions";

const CreateBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = JSON.parse(localStorage.getItem("profile"))?.result?._id;
  const initialPoststate = {
    title: "",
    article: "",
    tags: [],
    bannerImage: selectedFile,
    user: userId,
  };
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialPoststate);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setPostData(() => ({
      ...postData,
      bannerImage: selectedFile,
      user: userId,
    }));
  }, [postData, selectedFile, userId]);
  
  const handleImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setSelectedFile(event.target.result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    setPostData({});
    navigate("/home");
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "50%", width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <Box component="div" flex={1}>
            <InputLabel
              htmlFor="upload"
              sx={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: theme.palette.background.alt,
                width: "100%",
                height: "50px",
                marginY: 2,
              }}
            >
              <Upload />
              <Typography sx={{ marginLeft: 2 }}>Upload file</Typography>
            </InputLabel>
            <TextField
              hidden
              id="upload"
              name="file-upload"
              type="file"
              onChange={handleImage}
            />
            <TextField
              sx={{ fontSize: "1.5rem" }}
              label="Title"
              variant="outlined"
              name="title"
              value={postData.title}
              fullWidth
              required
              onChange={(e) => {
                setPostData(() => ({
                  ...postData,
                  title: e.target.value,
                }));
              }}
            />
            <TextField
              multiline={true}
              maxRows={8}
              minRows={6}
              inputMode="text"
              label="Article"
              name="article"
              variant="outlined"
              value={postData.article}
              onChange={(e) => {
                setPostData(() => ({
                  ...postData,
                  article: e.target.value,
                }));
              }}
              fullWidth
              required
              sx={{ marginY: 2 }}
            />
            <TextField
              type="text"
              fullWidth
              label="Tags"
              placeholder="Comma separated tags"
              value={postData.tags}
              onChange={(e) => {
                setPostData(() => ({
                  ...postData,
                  tags: e.target.value,
                }));
              }}
              sx={{ marginY: 2 }}
            />
            <Button
              sx={{ display: "block", width: "100%" }}
              type="submit"
              variant="contained"
            >
              <SendOutlined />
            </Button>
          </Box>
        </form>
        <Box ml={2} component="div" flex={2}>
          {selectedFile && (
            <Box
              display="flex"
              flexDirection="column"
              height="500px"
              width="500px"
            >
              <Box
                height="100%"
                width="100%"
                sx={{ objectFit: "contain" }}
                component="img"
                src={selectedFile}
                alt="img"
              />
              <IconButton
                sx={{
                  marginX: "auto",
                  backgroundColor: theme.palette.background.alt,
                  height: "50px",
                  width: 50,
                }}
                onClick={() => setSelectedFile(null)}
              >
                <DeleteOutlineOutlined color="warning" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CreateBlog;
