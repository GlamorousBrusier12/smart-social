const User = require('../models/user');
const Comment = require('../models/comment');
const Posts = require('../models/post');

module.exports.saveComment = function (req, res) {
    Posts.findById(req.body.post, function (err, post) {
        if(err){console.log('error in finding the linked post'); return;}
        if(post){
            Comment.create({
                content: req.body.commentContent,
                user: req.user.id,
                post: req.body.post
            }, function(err2, comment){
                if(err2){console.log('eror in comment creation '+err2); return}
                post.comments.push(comment);
                post.save();
            });
            return res.redirect('back');
        }
    });
}

// delete comment
module.exports.deleteComment = function (req, res) {
    Comment.findById(req.query.cmtid,function (err, comment){
        if(req.user.id == comment.user){
            comment.remove();
            Posts.findById(req.query.postid, function (err, post) {
                post.comments.remove( req.query.cmtid);
                post.save();
            })
        }else{
            console.log(`not deleted the comment`);
        }
        return res.redirect('back');
    });
}