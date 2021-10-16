const crypto = require('crypto');
const User = require('../models/user'); 
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;


// telling passport to use google oauth for login 
passport.use(new googleStrategy({
    clientID: "933491082145-v1aofpd09fn2qipmnhphmqp5ku408f5h.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err) {console.log(err); return;}
        
        // console.log(profile);
        // if user exists then return the user if the user is not founud then create one 
        // and return the user 
        if(user){
            return done(null, user);
        }else{
            User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },
                function(err, user){
                    if(err) {console.log(err); return;}
                    else{
                        return done(null, user);
                    }
                }
            )
        }
    });

}));
module.exports = passport;