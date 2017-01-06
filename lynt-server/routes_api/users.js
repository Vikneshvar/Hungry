var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var main = require('../config/main');

var config = require('../config/main');
var User = require('../models/user');

// Bring in defined Passport Strategy
require('../config/passport')(passport);

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/register', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var device = req.body.device;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('device', 'Device ID is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.status(401).json({success: false, message: errors});
  } else {
    var newUser = new User({
      name: name,
      email:email,
      username: username,
      password: password,
      devices: device
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      res.status(200).json({ success: true});
    });

  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.get('/authenticate', function(req, res) {User.findOne({username: req.headers.username}, function(err, user) {
  if (err) throw err;

  if (!user) {
    res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
  } else {
      // Check if password matches
      User.comparePassword(req.headers.password, user.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          const token = jwt.sign(user, config.secret, {
            issuer: user.id,
            expiresIn: 10080 // in seconds
          });
          res.status(200).json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

router.get('/profile', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var username = decoded["_doc"]["username"]
    User.getUserByUsername(username, function(err, profile) {
      if (err)
        res.status(400).send(err);

      if(profile==null){
        res.status(200).json({ message: 'User has no profile data.' });
      }else {
        var access_info = {};
        access_info['username'] = profile.username;
        access_info['name'] = profile.name;
        access_info['devices'] = profile.devices;
        res.status(200).json(access_info);
      }
    });
  });
});

module.exports = router;