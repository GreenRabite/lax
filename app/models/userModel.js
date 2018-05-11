const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

//create schema for User database
const userSchema = new Schema({
  local: {
    email: String,
    passwordDigest: String
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

module.exports = mongoose.model('users',userSchema);
