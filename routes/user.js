const express = require('express');
const router = express.Router();

const userCont = require('../controllers/userController.js');
const { route } = require('./posts.js');
// creating a route
router.get('/',userCont.userHome);
router.get('/profile',userCont.userProfile);
// redirecting the user to the sign in page
router.get('/signin',userCont.UserSignIn);

// redirecting the user to the sign up page
router.get('/signup', userCont.UserSignUp);

// creating the user (Sign Up)
router.post('/create', userCont.create);

// creating the user session (Sign In)
router.get('/create-session', userCont.createSession);


module.exports = router;