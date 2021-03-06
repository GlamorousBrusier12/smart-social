const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

// using the async await
module.exports.home = async function (req, res) {
    try {
        console.log('home page rendered!');
        // this is a promise
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        });
        
        let users = await  User.find({}) 
                    
        return res.render('home',{
            title: 'Smart Socail | Home',
            posts : posts,
            all_users: users
        });
    }  catch (error) {
        console.log('Error:', error);
        return;
    }


}