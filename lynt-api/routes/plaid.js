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

router.post('/account', requireAuth, function(req, res) {
  //[{"accuracy":30,"altitude":200,"heading":35,"latitude":250,"longitude":500,"speed":55,"timestamp":28172937}]

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var username = decoded["_doc"]["username"]
    User.getUserByUsername(username, function(err, user) {
      if (err)
        res.status(400).send(err);

      var key = req.body.key;

      user.keys.push(key);

      console.log('saving user public key');

      user.save(function(err) {

        if (err){
          console.log(err);
          res.status(400).send(err);
        }

        console.log('saved');
        res.status(201).json({ message: 'Bank Account Added! ~not really...' });
      });
    });
  });
});

module.exports = router;
