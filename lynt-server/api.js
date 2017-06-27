
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

// Just add bluebird to your package.json, and then the following line should work
mongoose.Promise = require('bluebird');

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


// Add headers
api.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
api.use('/plaid', plaid);

api.listen(port, function(){
  console.log('API server listening on port '+port);
});

module.export = api;
