const express = require('express');
const app = express();

app.use(express.static('public'));

//look for views(htmls) in views folder
app.set('views', 'views');
//using ejs viewing engine for using render etc
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('homepage');
})

app.listen(3000);