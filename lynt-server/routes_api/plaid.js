var express = require('express');
var plaid = require('plaid')
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var main = require('../config/main');
var lynt = require('../config/plaid.json')
var User = require('../models/user');

var plaidClient = new plaid.Client(lynt.PLAID_CLIENT_ID,
                                   lynt.PLAID_SECRET,
                                   plaid.environments.tartan);

// Bring in defined Passport Strategy
require('../config/passport')(passport);

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/add', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var username = decoded["_doc"]["username"]
    User.getUserByUsername(username, function(err, user) {
      if (err)
        res.status(400).send(err);

      var publicToken = req.body.public_token;

      plaidClient.exchangeToken(publicToken, function(err, exchangeTokenRes){
        if (err != null){
          // Handle errors!
        } else {
          var accessToken = exchangeTokenRes.access_token;
          User.keys.push(accessToken)
          console.log(User.keys);
          plaidClient.getAuthUser(accessToken, function(err, authRes){
            if (err != null){
              // Handle errors!
            } else {
              var accounts = authRes.accounts;

              // Return account data
              res.json({accounts: accounts});
            }
          });
        }
      });
    });
  });
});

module.exports = router;
