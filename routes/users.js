const express = require('express');
const router = express.Router();

const userController = require("../controller/user_controller");


router.get('/profile', userController.profile);
router.get('/post', userController.post);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
console.log("users router");

router.post('/create', userController.create);
module.exports = router;