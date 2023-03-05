import React from "react";
import { Box, useMediaQuery, CircularProgress } from "@mui/material";
import Blog from "./Blog";
import { useGetBlogsQuery } from "../../reducers/api";

const Blogs = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const localUserId = JSON.parse(localStorage.getItem("profile"))?.result?._id;
  const { data, isLoading, isSuccess, isError } = useGetBlogsQuery();

  return (
    <Box m="1.5rem 0.5rem">
      {!isLoading ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0 , 1fr))"
          justifyContent="space-between"
          rowGap="10px"
          columnGap="1.33%"
          mt="10px"
          sx={{
            "&> div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {isSuccess &&
            !isError &&
            data?.blogs?.map((blog) => (
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
