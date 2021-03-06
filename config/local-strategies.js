const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// require the User model
const User = require('../models/user');


// use the strategy thingy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},function(req, email, password, done) {
    // finding the user
    User.findOne({email:email},function(err, user){
        if(err){
            req.flash('error', err);
            // generally done(arg1, arg2) takes two aurgments arg1-> error (if any), arg-->2 boolean based on authentication if failed return false, if authentication is done properly then return the user  
            return done(err);
        }
        // either user isn't found or password isn't correct
        if(!user || user.password != password){
            req.flash('error', 'Invalid user credentials');
            return done(null, false);
        }
        else{
            // everything is going right
            return done(null, user);
        }
    });

    
}));

// serialising is a process where we set the used id to a cookie
// and de serialising is a process where we use the id present in the cookie 
// for establishing the user idenity in the controller 

// serializer the user to decide which key is to be kept in the cookies 
passport.serializeUser(function (user, done) {
    done(null, user.id);  
});

// deserializer the user using the id present in the cookie
passport.deserializeUser(async function (id, done ) {
    try {
        let user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.log('error in finding the user');
        done(error);
    }
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
     // req.user is already provided by the passport js we just need to use that
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