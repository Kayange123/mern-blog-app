import React, { Suspense, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BlogDetails from "./components/Blogs/BlogDetails";
import PopularBlogs from "./components/Blogs/PopularBlogs/PopularBlogs";
import Header from "./components/Header";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const AddBlog = React.lazy(() => import("./components/Blogs/AddBlog"));
const Blogs = React.lazy(() => import("./components/Blogs/Blogs"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const User = React.lazy(() => import("./components/User/User"));

function App() {
  const location = useLocation();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  console.log(state);
  return (
    <React.Fragment>
      <header>
        <Header user={user} setUser={setUser} />
      </header>
      <main>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={() => navigate("/popular")} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/popular" element={<PopularBlogs />} />
              </>
            ) : (
              <>
                <Route path="/" element={() => navigate("/blogs")} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/users/profile/:id" element={<User />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
                <Route path="/blogs/add" element={<AddBlog />} />
              </>
            )}
          </Routes>
        </Suspense>
      </main>
    </React.Fragment>
  );
}

export default App;
