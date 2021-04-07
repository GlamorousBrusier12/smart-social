const express = require('express');
const router = express.Router();


// requiring the post controller
const postsControler = require('../controllers/postsControler');

router.get('/',postsControler.postsPage);

module.exports = router;