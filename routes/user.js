const express = require('express');
const router = express.Router();

const userCont = require('../controllers/userController.js');
// creating a route
router.get('/',userCont.userHome);
router.get('/profile',userCont.userProfile);

module.exports = router;