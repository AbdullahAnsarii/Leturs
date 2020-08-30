const express = require('express');
const app = express();
const router = require('./router');
const session = require('express-session');
const Mongostore = require('connect-mongo')(session)
const flash = require('connect-flash')
//boilerplate code to create sessions and store cookie
let sessionOptions = session({
    //secret s someone couldn't guess
    secret: "I love javascript",
    store: new Mongostore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    //setting up cookie expiration time to be one day
    cookie: {maxAge: 1000*60*60*24,
        httpOnly: true}
})
app.use(sessionOptions);
app.use(flash());
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