const express = require("express");
const router = express.Router();

// requiring the home controller
const homeController = require("../controllers/homeControllers");
const { route } = require("./user");
console.log("router is loaded");

// add a route
router.get("/", homeController.home);
// adding a route to users related urls
router.use("/user", require("./user"));

// route related to posts
router.use("/posts", require("./posts"));

// route related to comments
router.use("/comment", require("./comments"));

router.use("/likes", require("./likes"));

// routes related to api
router.use("/api", require("./api"));

// exporting the router file
module.exports = router;
