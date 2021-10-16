const express = require('express');
const passport = require('passport');
const router = express.Router();

const userCont = require('../controllers/userController.js');
const { route } = require('./posts.js');
// creating a route
router.get('/profile/:id', passport.checkAuthentication,userCont.userProfile);
router.post('/update/:id', passport.checkAuthentication,userCont.update);
// redirecting the user to the sign in page
router.get('/signin',passport.denyAccessUser,userCont.UserSignIn);

// redirecting the user to the sign up page
router.get('/signup',passport.denyAccessUser, userCont.UserSignUp);

// creating the user (Sign Up)
router.post('/create', userCont.create);

// creating the user session (Sign In)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}
) ,userCont.createSession);

router.get('/signout', userCont.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'user/signin'}), userCont.createSession);
module.exports = router;