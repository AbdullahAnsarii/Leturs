//router will route the requested urls to the appropriate pages
const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/', userController.dashboard);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
