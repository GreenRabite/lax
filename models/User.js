const mongoose = require('mongose');
const { Schema } = mongoose;
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

//create schema for User database
const userSchema = new Schema({
  username: String,
  email: String
});

mongoose.model('users',userSchema);
