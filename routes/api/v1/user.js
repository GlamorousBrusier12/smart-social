const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api'); 
const userApiController = require('../../../controllers/api/v1/user_api');
<<<<<<< HEAD

router.post('/create-session',userApiController.createSession);
=======
router.post('/create-session', userApiController.createSession);
>>>>>>> d7a5ee54c04f8125707bc0a59c6c68219fa4ae2a

// exporting the router file
module.exports = router;