const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    unique: 1,
    required: true,
  },
  headline: String,
  blog: {
    type: String,
    required: true,
  },
  publish: {
    type: Boolean,
    default: 0,
    required: true,
  },
  publishedDate: Date,
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  commentName: String,
  comment: String,
  commentDate: Date,
});

mongoose.model("blogs", blogSchema);
