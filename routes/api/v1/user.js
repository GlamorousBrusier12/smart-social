const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api'); 
const userApiController = require('../../../controllers/api/v1/user_api');

router.post('/create-session',userApiController.createSession);

// exporting the router file
module.exports = router;