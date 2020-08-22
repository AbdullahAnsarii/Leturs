const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/about', (req, res) => {
    res.send('this is about page');
})

module.exports = router;
