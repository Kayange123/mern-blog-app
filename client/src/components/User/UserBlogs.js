import { CircularProgress } from "@material-ui/core";
import Blog from "../Blogs/Blog";

const UserBlogs = ({ user, blogs }) => {
  return (
    <div>
      {user && user.blogs ? (
        user.blogs.map((blog) => (
          <Blog
            id={blog._id}
            isUser={true}
            key={blog._id}
            title={blog.title}
            tags={blog.tags}
            blog={blog}
            bannerImage={blog.bannerImage}
            article={blog.article}
            username={user.name}
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UserBlogs;
