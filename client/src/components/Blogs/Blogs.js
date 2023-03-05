import { useEffect } from "react";
import { Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { getPosts } from "../../actions";

const Blogs = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const dispatch = useDispatch();
  const localUserId = JSON.parse(localStorage.getItem("profile"))?.result?._id;
  const { blogs } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Box m="1.5rem 1.5rem" className="container">
      {blogs ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0 , 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          mt="10px"
          sx={{
            "&> div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {blogs?.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              isUser={blog?.user._id === localUserId}
              id={blog?._id}
            />
          ))}
        </Box>
      ) : (
        <div className="container">
          <div className="text-center">
            <CircularProgress margin="auto" size={"6rem"} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default Blogs;
