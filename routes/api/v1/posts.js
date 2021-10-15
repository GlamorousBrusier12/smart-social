const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api'); 
<<<<<<< HEAD

router.get('/', postsApi.posts);
router.delete('/:id', postsApi.deletePost);
=======
const passport = require('passport');
router.get('/', postsApi.posts);
router.delete('/:id', passport.authenticate('jwt', {session: false}),postsApi.deletePost);
>>>>>>> d7a5ee54c04f8125707bc0a59c6c68219fa4ae2a


// exporting the router file
module.exports = router;