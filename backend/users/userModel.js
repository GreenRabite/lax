const mongoose = require('mongoose');
const { Schema } = mongoose;

//create schema for User database
const userSchema = new Schema({
  username: String,
  email: String,
  passwordDigest: String,
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('users',userSchema);
