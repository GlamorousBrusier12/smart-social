const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// require the User model
const User = require('../models/user');


// use the strategy thingy
passport.use(new LocalStrategy({
    usernameField: 'email'
},function(email, password, done) {
    // finding the user
    User.findOne({email:email},function(err, user){
        if(err){
            console.log('error in fi    nding the user');
            // generally done(arg1, arg2) takes two aurgments arg1-> error (if any), arg-->2 boolean based on authentication if failed return false, if authentication is done properly then return the user  
            return done(err);
        }
        // either user isn't found or password isn't correct
        if(!user || user.password != password){
            console.log('Invalid user credentials');
            return done(null, false);
        }
        else{
            // everything is going right
            return done(null, user);
        }
    });

    
}));


// serializer and de-serializer functions 
passport.serializeUser(function (user, done) {
    done(null, user.id);  
});

// deserializer
passport.deserializeUser(function (id, done ) {
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user');
            done(err);
        }
        done(null, user);
    });
});

// check user authentication 
// basically this is a middleware
passport.checkAuthentication =  function (req, res, next) {
    // if the user is authenticated then redirect him to the acutal page
    if(req.isAuthenticated()){
        return next();
    }
    // else redirect him to the sign in page
    else{
        return res.redirect('signin');
    }
}

// set authenticated user
passport.setAuthenticatedUser = function (req, res, next) {
 if(req.isAuthenticated()){
     res.locals.user = req.user;
 }   
 next();
}

passport.denyAccessUser = function (req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/user/profile');
    }
}
module.exports = passport;