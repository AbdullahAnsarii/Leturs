//controller will create all the funtions that router needs to add to the url before routing
//in terms of mvc controller is middleman between views and model
const User = require('../models/User');

exports.login = (req, res) => {
    let user = new User(req.body);
    user.login().then(result => {
        //creating session
        req.session.user = {favColor: "blue", username: user.data.username}
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
}

exports.logout = () => {

}

exports.dashboard = (req, res) => {
    //login krega tab hi session create hoga
    if(req.session.user){
        res.send('Welcome to the app');
    }
    //vrna homepage
    else{
        res.render('homepage');
    }
}

exports.register = (req, res) => {
    //creating blueprint of new user
    let user = new User(req.body);
    user.register();
    if (user.errors.length){
        res.send(user.errors);
    }
    else{
        res.send('Congratulations!!! no errors');
    }
}