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
    var email = decoded["_doc"]["email"]
    User.getUserByEmail(email, function(err, user) {
      if (err)
        res.status(400).send(err);

      var public_token = req.body.token;

      plaidClient.exchangeToken(public_token, function(err, exchangeTokenRes){
        if (err != null){
          // Handle errors!
        } else {
          var access_token = exchangeTokenRes.access_token;
          plaidClient.getAuthUser(access_token, function(err, authRes){
            if (err != null){
              // Handle errors!
            } else {
              User.addBank(user, authRes);
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

router.put('/remove', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var email = decoded["_doc"]["email"]
    User.getUserByEmail(email, function(err, user) {
      if (err)
        res.status(400).send(err);

      var bank_id = req.body.bank;

      for(i = 0; i < user.banks.length; i++){
        if (user.banks[i]._id == bank_id){
          user.banks.splice(i, 1);
          user.save();
          res.json({message: "removed " + bank_id});
          break;
        }
      }
      res.json({message: "No such bank in accounts"});

    });
  });
});

module.exports = router;
