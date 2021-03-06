const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api'); 
const passport = require('passport');
router.get('/', postsApi.posts);
router.delete('/:id', passport.authenticate('jwt', {session: false}),postsApi.deletePost);


// exporting the router file
module.exports = router;