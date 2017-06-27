var express = require('express');
var plaid = require('plaid')
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var main = require('../config/main');
var lynt = require('../config/plaid.json')
var User = require('../models/user');
var PlaidItem = require('../models/plaidItem');


var PLAID_CLIENT_ID  = lynt.PLAID_CLIENT_ID;
var PLAID_SECRET     = lynt.PLAID_SECRET;
var PLAID_PUBLIC_KEY = lynt.PLAID_PUBLIC_KEY;

//console.log('PLAID_CLIENT_ID: ' + PLAID_CLIENT_ID);
//console.log('PLAID_SECRET: ' + PLAID_SECRET);
//console.log('PLAID_PUBLIC_KEY: ' + PLAID_PUBLIC_KEY);

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var plaidClient = new plaid.Client(PLAID_CLIENT_ID,PLAID_SECRET,
  PLAID_PUBLIC_KEY,plaid.environments['sandbox']);

// Bring in defined Passport Strategy
require('../config/passport')(passport);

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

// Got the public token here on successfull sign in from mobile app.
// Exchange the public token for access token & item_id for a particular item of a user
router.post('/get_access_token', function(request, response, next) {
  console.log('Inside 111111111')
  //verify JWT user
  jwt.verify(request.body.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var email = decoded["_doc"]["email"]
    console.log('email: ',email)
    User.getUserByEmail(email, function(err, user) {
      if (err)
        res.status(400).send(err);
      if(user==null){
        res.status(200).json({ message: 'User has no profile data.' });
      } else {
        USER_ID = user._id;
        console.log('User Id: ' + USER_ID);
        PUBLIC_TOKEN = request.body.public_token;
        console.log("PUBLIC_TOKEN: ", PUBLIC_TOKEN);
        plaidClient.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
          if (error != null) {
            var msg = 'Could not exchange public_token!';
            console.log(error);
            return response.json({
              error: msg
            });
          }
          ACCESS_TOKEN = tokenResponse.access_token;
          ITEM_ID = tokenResponse.item_id;
          console.log('Access Token: ' + ACCESS_TOKEN);
          console.log('Item ID: ' + ITEM_ID);

          var newPlaidItem = new PlaidItem({
            plaidItemId: ITEM_ID,
            accessToken:ACCESS_TOKEN,
            userId: USER_ID
          });

          PlaidItem.createPlaidItem(newPlaidItem, function(err, user){
            if(err) {
              throw err;
              console.log(err);
            } 
            console.log("Success");
            response.status(200).json({ success: true});
            if(response.status==200){
            console.log("Success");
            }
          });
        });
      }
    });
});
});

router.get('/accounts', function(request, response, next) {
  // Retrieve high-level account information and account and routing numbers
  // for each account associated with the Item.
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }

    console.log(authResponse.accounts);
    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers,
    });
  });
});


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

      res.json(User.removeBank(user, bank_id));
    });
  });
});

module.exports = router;