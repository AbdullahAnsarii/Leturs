//router will route the requested urls to the appropriate pages
const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');

router.get('/', userController.dashboard)

router.get('/about', (req, res) => {
    res.send('this is about page');
})

module.exports = router;
