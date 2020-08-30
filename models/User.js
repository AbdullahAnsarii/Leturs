//here in model part we will actually model data we recieve controller requires it from here.
//this points to whoever is calling here user is calling the register() function
//You can't use arrow functions for defining a constructor function.
//mongodb functions by default return Promises.
//hash passwords at the end remember
const usersCollection = require('../db').db().collection('users');
const validator = require('validator');
let User = function(data) {
    this.data = data;
    this.errors = [];
}
User.prototype.cleanUp = function() {
    //here if user input bogus data we deal with it
    //just extra not necessarily needed
    if(typeof(this.data.username) != 'string'){this.data.username = ''};
    if(typeof(this.data.email) != 'string'){this.data.email = ''};
    if(typeof(this.data.password) != 'string'){this.data.password = ''};

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function(){
    return new Promise(async (resolve, reject) => {
        if (this.data.username == ''){this.errors.push('You cannot leave username empty')};
        if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)){this.errors.push('Username can only contain letters or alphabets')};
        if (!validator.isEmail(this.data.email)){this.errors.push('Please ener a valid email address')};
        if (this.data.password == ''){this.errors.push('You cannot leave password empty')};
        if (this.data.username.length > 0 && this.data.username.length < 3){this.errors.push('Username must be atleast 3 characters long')};
        if (this.data.password.length > 0 && this.data.password.length < 12){this.errors.push('Password must be atleast 12 characters long')};
        //if username & email is valid let's check to see if it is already taken
        if(this.data.username.length > 2 && this.data.username.length < 30 && validator.isAlphanumeric(this.data.username)){
            let usernameTaken = await usersCollection.findOne({username: this.data.username});
            if(usernameTaken){this.errors.push('This username already exists');}
        }
        if(validator.isEmail(this.data.email)){
            let emailTaken = await usersCollection.findOne({email: this.data.email});
            if(emailTaken){this.errors.push('This email already exists');}
        }
        resolve();
    })
}
//attemptedUuser is the one who logs in and sends in credentials i.e this.data.username
User.prototype.login = function(){
    return new Promise((resolve, reject) => {
        this.cleanUp();
        usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
                if(attemptedUser && attemptedUser.password == this.data.password){
                    resolve('Congrats');
                }
                else{
                    reject('Invalid Username/Password');
                }
        }).catch( () => {
            reject('Unknown error occured!!')
        })

        }) 
    }


User.prototype.register = function(){
    return new Promise (async (resolve, reject) => {
        //Validate user data
        this.cleanUp();
        //we added database so we need to wait until all the validation is complete
        await this.validate();
    
    
        //If there are no validation error than
        //than save data in database
        if(!this.errors.length){
            await usersCollection.insertOne(this.data);
            resolve();
        }
        else{
            reject(this.errors);
        }
    })
}
module.exports = User;