const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api'); 

router.get('/', postsApi.posts);
router.delete('/:id', postsApi.deletePost);


// exporting the router file
module.exports = router;