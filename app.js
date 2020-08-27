const express = require('express');
const app = express();
const router = require('./router');
//boilerplate code so that we can use request.body
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('public'));
//look for views(htmls) in views folder
app.set('views', 'views');
//using ejs viewing engine for using render etc
app.set('view engine', 'ejs')

app.use('/', router);

module.exports = app;