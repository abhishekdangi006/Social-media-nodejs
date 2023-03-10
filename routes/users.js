const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require("../controller/user_controller");


router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication, userController.update);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/signout', userController.destroySession);
console.log("users router");

router.post('/create', userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createSession);

module.exports = router;