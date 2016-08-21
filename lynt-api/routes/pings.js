var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var Ping = require('../models/ping');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

router.get('/list', requireAuth, function(req, res) {
  Ping.find({'userId': req.user._id}, function(err, pings) {
    if (err)
      res.status(400).send(err);

    res.status(200).json(pings);
  });
});

router.post('/ping', requireAuth, function(req, res) {
  var ping = new Ping();
  ping.userId = req.user._id;
  ping.lat = req.body.lat;
  ping.lon = req.body.lon;
  ping.ts = req.body.ts;
  console.log('saving');
  ping.save(function(err) {
    console.log(err);
    if (err)
      res.status(400).send(err);

    console.log('saved');
    res.status(201).json({ message: 'Location Saved!' });
  });
});

module.exports = router;