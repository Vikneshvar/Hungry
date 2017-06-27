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
  var first = req.body.first;
  var last = req.body.last;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var device = req.body.device;

  // Validation
  req.checkBody('first', 'First name is required').notEmpty();
  req.checkBody('last', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('device', 'Device ID is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.status(401).json({success: false, message: errors});
  } else {
    User.getUserByEmail(email, function(err, user){
      if(err){
        res.status(401).json({success: false, message: err});
      }else if(user){
        res.status(401).json({success: false, message: "Email already in use."});
      }else{
        var newUser = new User({
          name: {first:first, last:last},
          email:email,
          password: password,
          devices: device
        });

        User.createUser(newUser, function(err, user){
          if(err) throw err;
          res.status(200).json({ success: true});
        });
      }
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.get('/authenticate', function(req, res) {User.findOne({email: req.headers.email}, function(err, user) {
  if (err) throw err;

  if (!user) {
    res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
  } else {
      // Check if password matches
      User.comparePassword(req.headers.password, user.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Check if device is already listed to user profile
          var matched = false;
          for(i = 0; i < user.devices.length; i++){
            if (user.devices[i] === req.headers.device){
              matched = true;
            }
          }

          // If it's not listed, add it to device list
          if (!matched){
            user.devices.push(req.headers.device);
            user.save();
          }

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

router.get('/getuser', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var email = decoded["_doc"]["email"]
    User.getUserByEmail(email, function(err, user) {
      if (err)
        res.status(400).send(err);

      if(user==null){
        res.status(200).json({ message: 'User has no profile data.' });
      }else {
        var access_info = {};
        access_info['_id'] = user._id;
        access_info['first'] = user.name.first;
        access_info['last'] = user.name.last;
        access_info['email'] = user.email;
        access_info['devices'] = user.devices;
        access_info['banks'] = user.banks; // Temporary
        res.status(200).json(access_info);
      }
    });
  });
});

router.post('/updatepreference', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var email = decoded["_doc"]["email"];
    User.getUserByEmail(email, function(err, user) {
      if (err) {
        res.status(400).send(err);
      }else {
        console.log("PP",req.body.preference)
        var preferenceList=req.body.preference;
        User.updatePreference(user,preferenceList, function(err, updatedUser){
          if(err) throw err;  
            var access_info = {};
            access_info['first'] = updatedUser.name.first;
            access_info['last'] = updatedUser.name.last;
            access_info['email'] = updatedUser.email;
            access_info['devices'] = updatedUser.devices;
            access_info['banks'] = updatedUser.banks;
            access_info['preference'] = updatedUser.preference;
            res.status(200).json(access_info);
        });
      }
    });
  });
});

module.exports = router;
