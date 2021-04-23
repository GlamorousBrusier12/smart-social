// import the user model 
const User = require('../models/user'); 


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
    try {
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            console.log(`${user.name} has been updated`);
            res.redirect('back');
        }else{
            return res.status(401);
        }    
    } catch (error) {
        console.log('Error:', error);
        return;
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
    req.flash('success', 'you have logged in sucessfully');
    
    return res.redirect('/');
}

// logout 
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'you have logged out!');
    return res.redirect('../');    
}