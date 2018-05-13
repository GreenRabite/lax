const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const secureRandom = require('secure-random');

//create schema for User database
const userSchema = new Schema({
  local: {
    email: String,
    passwordDigest: String,
    session: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generatePWDigest = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.local.passwordDigest,null);
};

userSchema.methods.generateSessionToken = function(){
  const bytes = secureRandom(10, {type: 'Array'}); //return an Array of 10 bytes
  return bytes.join("");
};

module.exports = mongoose.model('users',userSchema);
