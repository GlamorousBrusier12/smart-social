const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.postsPage = function (req ,res) {
    return res.render('posts', {
        title: 'Smart Social | Posts'
    });
}

// using async
module.exports.savePost = async function(req, res){
    try {
        // using await
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        return res.redirect('back');        
    }  catch (error) {
        console.log('Error:', error);
        return;
    }
}
module.exports.deletePost = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id) 
        
            // finding if the post exist
        if(post){
            if (post.user == req.user.id) {
                // removing the post
                post.remove();

                // removing the comments related to that post
                // also using the await function without assinging to any varible 
               await Comment.deleteMany({post: req.params.id});
            }
        }
        else{
            console.log(`havent deleted the post`);
        }
        return res.redirect('back');

    }  catch (error) {
        console.log('Error:', error);
        return;
    }
} 