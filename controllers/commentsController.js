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
