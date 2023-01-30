const express = require('express');
const router = express.Router();

const userController = require("../controller/user_controller");


router.get('/profile', userController.profile);
router.get('/post', userController.post);

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.get('/delete-session', userController.deleteSession);
module.exports = router;