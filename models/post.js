const mongoose = require("mongoose");
const User = require("./user");
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // linking it to the user schema
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // linking it to the comments schema
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like", // linking it to the likes schema
      },
    ],
  },
  {
    timestamps: true,
  }
);

// creating a collection which contains the schema instances by mongooose.model('name of th ecollection', schema to be followed)
const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
