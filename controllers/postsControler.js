const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
module.exports.postsPage = function (req, res) {
  return res.render("posts", {
    title: "Smart Social | Posts",
  });
};

// using async
module.exports.savePost = async function (req, res) {
  try {
    // using await
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      post = await post.populate("user", "name").execPopulate();
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "post created!!",
      });
    }
    req.flash("success", "Post created!");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
module.exports.deletePost = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    // finding if the post exist
    if (post.user == req.user.id) {
      // delete all the likes assosciated with the posts
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      // delete all likes associated with comments of the post
      await Like.deleteMany({ _id: { $in: post.comments } });

      // removing the post
      post.remove();

      // removing the comments related to that post
      // also using the await function without assinging to any varible
      await Comment.deleteMany({ post: req.params.id });

      req.flash("success", "Post and respective comments deleted!");
      //checking the post is xhr
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
            posts: post,
          },
          message: "post deleted",
        });
      }
    }

    return res.redirect("back");
  } catch (error) {
    console.log("Error:", error);
    return res.redirect("back");
  }
};
