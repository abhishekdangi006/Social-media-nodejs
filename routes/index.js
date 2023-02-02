const express = require('express');
const router = express.Router();

const controller = require("../controller/home_controller");

router.get('/', controller.home);
router.use('/users', require('./users'));
router.use('/post', require('./post'));

module.exports = router;