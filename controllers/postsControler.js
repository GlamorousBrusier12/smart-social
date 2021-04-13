const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.postsPage = function (req ,res) {
    return res.render('posts', {
        title: 'Smart Social | Posts'
    });
}

module.exports.savePost = function(req, res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, post){
        if(err){
            console.log('error is saving the post into the db');
            return res.redirect('back');
        }
        return res.redirect('back');        
    });
} 