const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function (req, res) {
    console.log('home page rendered!');
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('err in finding the Post of the user');
    //     }
    //     return res.render('home',{
    //         title: 'Smart Socail | Home',
    //         posts : posts
    //     });   
    // });
    Post.find({}).populate('user').exec(function (err, posts1) {
            if(err){
                        console.log('err in finding the Post of the user',err);
                    }
            return res.render('home',{
                    title: 'Smart Socail | Home',
                posts : posts1
            });
            });

    }