//here in model part we will actually model data we recieve controller requires it from here.
//this points to whoever is calling here user is calling the register() function
//You can't use arrow functions for defining a constructor function.
let User = function(data) {
    this.data = data;
    this.errors = [];
}
User.prototype.validate = function() {
    if (this.data.username == ''){this.errors.push('You cannot leave username empty')};
    if (this.data.email == ''){this.errors.push('You cannot leave email empty')};
    if (this.data.password == ''){this.errors.push('You cannot leave password empty')};

}
User.prototype.register = function() {
    //Validate user data
    this.validate()


    //If there are no validation error than
    //than save data in database
}
module.exports = User;