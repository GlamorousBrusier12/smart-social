const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async (req, res) => {
  try {
    let likable,
      deleted = false;
    if (req.query.type == "Post") {
      likable = await Post.findById(req.query.id).populate("likes");
    } else {
      likable = await Comment.findById(req.query.id).populate("likes");
    }

    // check if like already exists
    let existingLike = await Like.findOne({
      likable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    if (existingLike) {
      // delete the like from the original likes table and the posts/comments table
      likable.likes.pull(existingLike);
      likable.save();

      existingLike.remove();
      deleted = true;
    } else {
      // create a like
      let newLike = await Like.create({
        likable: req.query.id,
        onModel: req.query.type,
        user: req.user._id,
      });
      likable.likes.push(newLike._id);

      likable.save();
    }
    return res.status(200).json({
      message: "Request sucessfull",
      data: {
        deleted: deleted,
      },
    });
  } catch (e) {
    console.log("err in likes controller", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
