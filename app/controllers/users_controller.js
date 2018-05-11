const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');


// exports.register = function(req,res,cb){
//   User.findOne({email: req.body.email},(err,user)=>{
//     if (user) {
//       return res.status(400).json(['Email has already been registered']);
//     }else {
//       const newUser = new User(req.body);
//       newUser.password = bcrypt.hashSync(req.body.password,10);
//       newUser.save(())
//     }
//   });
// };
