// import the user model 
const User = require('../models/user'); 


module.exports.userProfile = function (req, res) {
    
    User.findById(req.params.id, function(err, user){

        
        return res.render('user', {
            title: 'User',
            profile_user: user
        });
    });
}

module.exports.update = function (req, res) {
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body , function(err, user){
            console.log(`${user.name} has been updated`);
            res.redirect('back');
        } );
    }else{
        return res.status(401);
    }    
}
// conncecting to the sign in and sign up page
module.exports.UserSignIn = function (req, res) {
    return res.render('signin',{
        title: 'Smart Social | Sign In'
    });
}
module.exports.UserSignUp = function (req, res) {
    return res.render('signup',{
        title: 'Smart Social | Sign Up'
    });
}
module.exports.create = function (req, res) {
    if(req.body.password != req.body.password2){
        console.log(`Passwords: ${req.body.password},${req.body.password2} Do-not match bro`);
        return res.redirect('back');
    }else{
        User.findOne({email: req.body.email }, function(err, user){
            if(err){console.log('error in finding the user in DB'); return}
            
            if(!user){
                User.create(req.body, function(err3, user2){
                    if(err3){console.log('error in creating the user in DB'); return res.redirect('back');}
                    console.log(`******created user successfully : ${user2.name}******`);
                    return res.redirect('/user/signin');
                });
            }
            else{
                // console.log(`${user.name} already exists!`);
                return res.redirect('/user/signin');
            }
        })
    }
}
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

// logout 
module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('../');    
}