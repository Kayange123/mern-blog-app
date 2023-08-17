import mongoose from "mongoose";
import Blog from "../models/blog.js";
import User from "../models/user.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ _id: -1 }).populate("user");
    if (!blogs) {
      return res.status(404).json({ message: "No blogs Found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

export const postBlog = async (req, res, next) => {
  const { title, article, bannerImage, user, tags } = req.body;
  let existingUser,
    existingBlog,
    date = new Date();
  const getBlogId = () => {
    const possible = "abcdefghijklmnopqrstuvwxyz123456789";
    let blogId = "";
    for (let i = 0; i < 8; i++) {
      blogId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return blogId;
  };
  let id = getBlogId();
  try {
    existingBlog = await Blog.findOne({ blogId: id });
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }
  if (existingBlog) {
    id = getBlogId();
  }

  const blog = new Blog({
    blogId: id,
    title: title,
    article: article,
    bannerImage: bannerImage,
    publishedAt: date,
    tags,
    user,
  });

  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // await blog.save({ session });
    // existingUser.blogs.push(blog);
    // await existingUser.save({ session });
    await blog.save();
    existingUser.blogs.push(blog);
    await existingUser.save();
    // await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  let blog;
  const { title, article, tags } = req.body;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      article,
      tags,
    });
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No blogs Found" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    if (!blog) {
      return res.status(500).json({ message: "Unable to delete the blog" });
    }
    return res.status(200).json({ message: "The blog was successful deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsByUser = async (req, res, next) => {
  let userBlogs;
  const userId = req.params.id;
  try {
    userBlogs = await User.findById(userId, { password: 0 }).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs Found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId)
      return res.status(400).json({ message: "User not authenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No post Found with this id" });
    }
    const post = await Blog.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      //Like a post
      post.likes.push(req.userId);
    } else {
      //Dislike a post
      post.likes.filter((id) => id !== req.userId);
    }
    const likedPost = await Blog.findByIdAndUpdate(id, post, { new: true });
    return res.status(200).json({ likedPost });
  } catch (error) {
    return console.log(error);
  }
};
