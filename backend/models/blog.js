import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  blogId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  article: {
    type: String,
  },
  bannerImage: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  tags: [String],
  imageUrl: {
    type: String,
    default: null,
  },
});
export default mongoose.model("blog", blogSchema);
