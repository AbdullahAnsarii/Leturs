const express = require('express');
const app = express();
const router = require('./router');

app.use(express.static('public'));
//look for views(htmls) in views folder
app.set('views', 'views');
//using ejs viewing engine for using render etc
app.set('view engine', 'ejs')

app.use('/', router);

app.listen(3000);