import User from "../models/user.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(500)
        .json({ message: "Email already registered, try to login" });
    }

    const user = new User({
      name: fullname,
      email,
      password: hashedPassword,
      blogs: [],
    });
    const newUser = await user.save();
    if (!newUser) {
      return res.status(500).json({ message: " Failed to add a User" });
    }
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      "MernBlogApp",
      { expiresIn: "1h" }
    );
    return res.status(201).json({ result: newUser, token });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "No user Found with this Email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "MernBlogApp",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  let deleted;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: "Could not find a user by this id" });
  try {
    deleted = await User.findByIdAndDelete(id);
  } catch (error) {
    return console.log(err);
  }
  if (deleted) {
    return res.status(200).json({ message: "User is succesful deleted" });
  }
  return res.status(500).json({ message: "Could not delete the user" });
};
export const makeAdmin = async (req, res) => {
  const { id } = req.params;
  let user;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: "Could not find a user with this id" });
  try {
    user = await User.findByIdAndUpdate(
      id,
      {
        userLevel: 5,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  if (user) {
    return res.status(200).json({ message: "A user is now an admin" });
  }
  return res.status(400).json({ message: "Could not make a user an admin" });
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "No user found with this id" });
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "No user found with this id" });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const changeProfile = (req, res) => {
  const { imageUrl } = req.body;
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "No user found with this id" });
    const user = User.findOneAndUpdate({ _id: id }, { imageUrl });
    return res.status(201).json({ result: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
