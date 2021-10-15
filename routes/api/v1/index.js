const express = require('express');
const router = express.Router();

router.use('/posts',require('./posts'));
router.use('/user', require('./user'));
// exporting the router file
module.exports = router;