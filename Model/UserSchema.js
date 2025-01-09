const {Schema, model,Types} = require("mongoose");
  
  const UserSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
   
  });
  
  const UserModel = model('User', UserSchema) //schema converted to model
  
  module.exports = UserModel