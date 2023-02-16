import express from "express";
import {
  deleteUser,
  getAllUsers,
  makeAdmin,
  signin,
  signup,
  getUserById,
  changeProfile,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/profile/:id", getUserById);
userRoutes.patch("/users/profile/:id/changeprofile", auth, changeProfile);
userRoutes.post("/users/signup", signup);
userRoutes.post("/users/signin", signin);
userRoutes.delete("/users/:id/delete", auth, deleteUser);
userRoutes.patch("/users/:id/makeadmin", auth, makeAdmin);

export default userRoutes;
