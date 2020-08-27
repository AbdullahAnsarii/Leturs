//here in model part we will actually model data we recieve controller requires it from here.
//this points to whoever is calling here user is calling the register() function
//You can't use arrow functions for defining a constructor function.
const usersCollection = require('../db').collection('users');
const validator = require('validator');
let User = function(data) {
    this.data = data;
    this.errors = [];
}
User.prototype.cleanUp = function() {
    //here ifuser input bogus data we deal with it
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

User.prototype.validate = function() {
    if (this.data.username == ''){this.errors.push('You cannot leave username empty')};
    if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)){this.errors.push('username can only contain letters or alphabets')};
    if (!validator.isEmail(this.data.email)){this.errors.push('Please ener a valid email address')};
    if (this.data.password == ''){this.errors.push('You cannot leave password empty')};
    if (this.data.username.length > 0 && this.data.username.length < 3){this.errors.push('username must be atleast 3 characters long')};
    if (this.data.password.length > 0 && this.data.password.length < 12){this.errors.push('password must be atleast 12 characters long')};
}
User.prototype.register = function() {
    //Validate user data
    this.cleanUp();
    this.validate();


    //If there are no validation error than
    //than save data in database
    if(!this.errors.length){
        usersCollection.insertOne(this.data);
    }
}
module.exports = User;