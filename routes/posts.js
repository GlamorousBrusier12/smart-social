const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsControler = require('../controllers/postsControler');// requiring the post controller



router.get('/',postsControler.postsPage);
router.post('/create-post', postsControler.savePost);
module.exports = router;