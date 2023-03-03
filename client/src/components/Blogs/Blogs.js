import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions";

const Blogs = () => {
  const dispatch = useDispatch();
  const localUserId = JSON.parse(localStorage.getItem("profile"))?.result?._id;
  const { blogs } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container">
      {blogs ? (
        blogs?.map((blog) => (
          <Blog
            blog={blog}
            isUser={localUserId === blog.user._id}
            key={blog._id}
          />
        ))
      ) : (
        <div className="container">
          <div className="text-center">
            <CircularProgress margin="auto" size={"6rem"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
