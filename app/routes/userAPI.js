const mongoose = require('mongoose');
const UserController = require('../controllers/users_controller');
const User = mongoose.model('users');

module.exports = (app,passport) =>{

  app.post('/api/users', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return res.json(err); }
      if (!user) { return res.json('User already has email'); }
      console.log(res.body);
      res.json(user);
    })(req, res, next);
  });

  app.get('/api/current_user', (req, res) => {
		res.json(req.user);
	});

  // process the login form
  // app.post('/api/session', function(req, res, next) {
  //   passport.authenticate('local-login', function(err, user, info) {
  //     if (err) { return res.json(err); }
  //     if (!user) { return res.json('Wrong Username or Password'); }
  //     console.log(req.session.passport);
  //     res.json(user);
  //   })(req, res, next);
  // });

  app.post('/api/session',
  passport.authenticate('local-login'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
    res.json(req.session);
  });

};
//Handy function to check if a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
