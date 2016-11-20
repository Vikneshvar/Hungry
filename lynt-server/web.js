var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');

// configuration ===========================================
var web = express();
// set our port
var port = process.env.PORT || 80;

web.use(express.static(path.join(__dirname + '/public')));

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
web.use(bodyParser.json());

// parse application/vnd.api+json as json
web.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
web.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
web.use(methodOverride('X-HTTP-Method-Override'));

// routes ==================================================
require('./routes_web/index')(web);

// start app ===============================================
web.listen(port, function(){
  console.log('Web server listening on port '+port);
});

// expose app
module.exports = web;
