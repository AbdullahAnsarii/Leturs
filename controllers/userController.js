//controller will create all the funtions that router needs to add to the url before routing
//in terms of mvc controller is middleman between views and model
const User = require('../models/User');

exports.login = (req, res) => {
    let user = new User(req.body);
    user.login().then(result => {
        //creating session
        req.session.user = {favColor: "blue", username: user.data.username}
        req.session.save(() => {
            res.redirect('/');
        })
    }).catch(err => {
        //eq to req.sessions.flash.errors =[]
        //jo bhi error hoga list me ajayega
        req.flash('errors', err);
        req.session.save(() => {
            res.redirect('/');
        })
    });
}

exports.logout = (req, res) => {
    //destroy is async but we didn't use promise we use callback because it isn't supportive yet 
    req.session.destroy(() => {
        res.redirect('/')
    })

}

exports.dashboard = (req, res) => {
    //login krega tab hi session create hoga
    if(req.session.user){
        res.render('homeDashboard', {username: req.session.user.username});
    }
    //vrna homepage
    //flash package will delete the data as soon as you have accessed vrna normally bhi krskte thy
    else{
        res.render('homepage', {errors: req.flash('errors')});
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