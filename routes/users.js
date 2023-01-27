const express = require('express');
const router = express.Router();

const profileController = require("../controller/user_controller");
const postController = require('../controller/post_controller');

router.get('/profile', profileController.profile);
router.get('/post' , postController.post);
console.log("users router");
module.exports = router;