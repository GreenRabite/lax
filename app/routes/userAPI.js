const mongoose = require('mongoose');
const UserController = require('../controllers/users_controller');
const User = mongoose.model('users');
const jwt = require('jsonwebtoken');

module.exports = (app,passport) =>{

  app.post('/api/users', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return res.json(err); }
      if (!user) { return res.json('User already has email'); }
      req.login(user, function(err2) {
        if (err2) { return next(err); }
        return res.json(user);
      });
    })(req, res, next);
  });

  app.get('/api/current_user', (req, res) => {
		res.json(req.user);
	});

  app.post('/api/session',
  passport.authenticate('local-login'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
    req.session.user = req.user;
    console.log("session",req.session.user);
    res.json({
      id: req.user._id,
      email: req.user.local.email,
      session: req.user.local.session
    });
  });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/');
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
