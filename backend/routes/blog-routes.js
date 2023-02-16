import express from "express";
import {
  deleteBlog,
  getBlogs,
  getBlogsByUser,
  getById,
  likePost,
  postBlog,
  updateBlog,
} from "../controllers/blogController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs/create", auth, postBlog);
router.put("/blogs/update/:id", auth, updateBlog);
router.get("/blogs/:id", getById);
router.delete("/blogs/delete/:id", auth, deleteBlog);
router.get("/blogs/user/:id", getBlogsByUser);
router.patch("/blogs/:id/like", auth, likePost);

export default router;
