
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lyntdb');

var users = require('./routes_api/users');
var pings = require('./routes_api/pings');
var plaid = require('./routes_api/plaid');

// Init App
var api = express();
var port = process.env.PORT || 3000;

// BodyParser Middleware
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

// Express Validator
api.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

api.use('/users', users);
api.use('/pings', pings);
api.use('/bank', plaid);

api.listen(port, function(){
  console.log('API server listening on port '+port);
});

module.export = api;