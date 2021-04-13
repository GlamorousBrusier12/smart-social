const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function (req, res) {
    console.log('home page rendered!');
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function (err, posts) {
            if(err){
                        console.log('err in finding the Post of the user',err);
                        return;
                    }
            return res.render('home',{
                    title: 'Smart Socail | Home',
                    posts : posts
                });
            });

    }