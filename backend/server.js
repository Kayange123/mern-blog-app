import express from "express";
import mongoose from "mongoose";
import router from "./routes/blog-routes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api", router);
app.use("/api", userRoutes);
dotenv.config();

const PORT = 5000;
const mongodb = process.env.MONGODB_URL;

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT))
  .then(() => {
    console.log(`Connected to database and app is running on port ${PORT}`);
  })
  .catch((err) => {
    console.log(err.message);
  });
