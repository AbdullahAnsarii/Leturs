//controller will create all the funtions that router needs to add to the url before routing
//in terms of mvc controller is middleman between views and model
const User = require('../models/User');

exports.login = () => {

}

exports.logout = () => {

}

exports.dashboard = (req, res) => {
    res.render("homepage");
}

exports.register = (req, res) => {
    //creating blueprint of new user
    let user = new User(req.body);
    console.log(req.body)
}