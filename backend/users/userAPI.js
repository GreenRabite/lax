const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) =>{

  app.post('/api/users', function(req,res){
    console.log(req.body);
    const newUser = new User(req.body);
    newUser.save(function(err,user){
      if (err) {
        return res.send({errors: err});
      }else {
        return res.json(user);
      }
    });
  });

}
