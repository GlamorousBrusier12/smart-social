const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.posts = async function (req, res) {

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    });
<<<<<<< HEAD


=======
>>>>>>> d7a5ee54c04f8125707bc0a59c6c68219fa4ae2a
    return res.status(200).json({
        message: 'list of posts',
        posts: posts
    });
}


// delete a post using api

module.exports.deletePost = async function (req, res) {
    try {
<<<<<<< HEAD
        let post = await Post.findById(req.params.id) 
        
        post.remove();
        
        // removing the comments related to that post
        // also using the await function without assinging to any varible 
        await Comment.deleteMany({post: req.params.id});
        
        return res.status(200).json({
            message:'post and associated comments deleted successfully'
        });
=======
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            
            // removing the comments related to that post
            // also using the await function without assinging to any varible 
            await Comment.deleteMany({post: req.params.id});
            
            return res.status(200).json({
                message:'post and associated comments deleted successfully'
            });
        }
        else{
            return res.status(401).json({
                message: "you Cannot Delete this post"
            });
        }
>>>>>>> d7a5ee54c04f8125707bc0a59c6c68219fa4ae2a
    }  catch (error) {
        console.log('Error:', error);
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
} 