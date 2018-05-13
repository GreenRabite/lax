// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
// const expose = require('express-expose');

mongoose.connect(keys.mongoURI);
require('./app/models/userModel');

//Express instance
const app = express();

require('./config/passport')(passport); // pass passport for configuration

//setup view engine for index.html page
app.set('view engine', 'ejs');

//public static directory
app.use(express.static('public'));

//Parses the Body using this middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.raw());

// required for passport
app.use(session({ secret: 'GreenRabitesAreTheBest' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
app.get('/', function (req, res) {
  // res.expose(req.user, 'currentUser');
  res.render('index',{currentUser: req.user});
});
require('./app/routes/userAPI')(app,passport);

// Instruct node to listen to port 3000
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT);

// socket.io example
require('./frontend/sockets/example')(server);

//set up middleware for logger
app.use(logger('dev'));

//MiddleWare
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
