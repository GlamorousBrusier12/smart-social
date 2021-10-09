// import the user model 
const User = require('../models/user'); 
const fs = require('fs');
const path = require('path');

module.exports.userProfile = async  function (req, res) {
    
    try {
        
        let user = await User.findById(req.params.id);
        
        return res.render('user', {
            title: 'User',
            profile_user: user
        });
    } catch (error) {
        console.log('Error:', error);
        return;
    }
}
    
module.exports.update = async  function (req, res) {
    // if(req.user.id == req.params.id){
        //     let user = await User.findByIdAndUpdate(req.params.id, req.body);
        //     console.log(`${user.name} has been updated`);
        //     res.redirect('back');
        // }else{
            //     return res.status(401);
            // }    
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            // so generally the body of the req (form) isn't available as it is multipart so we use multer which proceeses the req and make us available to use
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('**********multer error*******: '+err);
                }

                user.name = req.body.name;
                user.email = req.body.email;
                // check if the user uploaded any picture 
                if(req.file){
                    // check if the file is previously available and if yes delete it
                    if(user.avatar){
                        req.flash('success', 'Updated the profile Pic sucessfully');
                        // deletes the pic that has been before
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarpath + '\\' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (error) {
            console.log('Error:', error);
            return;
        }
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
module.exports.create = async function (req, res) {
    try {
        if(req.body.password != req.body.password2){
            console.log(`Passwords: ${req.body.password},${req.body.password2} Do-not match bro`);
            return res.redirect('back');
        }else{
            let user = await User.findOne({email: req.body.email });
            if(!user){
                let user2 = User.create(req.body);
                console.log(`******created user successfully : ${user2.name}******`);
            }
            return res.redirect('/user/signin');
        }
    } catch (error) {
        console.log('Error:', error);
        return;
    }
}
module.exports.createSession = function (req, res) {
    // setting the flash message here!
     req.flash('success', 'you have logged in sucessfully');
    
    return res.redirect('/');
}

// logout 
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'you have logged out!');
    return res.redirect('../');    
}


// to set up the flash messages you have to write the below statement
// req.flash('key/type of the flash', content of the flash);