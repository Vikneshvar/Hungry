var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var main = require('../config/main')

var Gps = require('../models/gps');

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

router.get('/list', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var username = decoded["_doc"]["username"]
    Gps.getGpsByUsername(username, function(err, pings) {
      if (err)
        res.status(400).send(err);

      if(pings==null){
        res.status(200).json({ message: 'User has no gps data.' });
      }else {
        res.status(200).json(pings);
      }
    });
  });
});

router.post('/ping', requireAuth, function(req, res) {

  //verify JWT user
  jwt.verify(req.headers.authorization.replace('JWT ', ''), main['secret'], function(err, decoded) {
    //get user pings
    var username = decoded["_doc"]["username"]
    Gps.getGpsByUsername(username, function(err, pings) {
      if (err)
        res.status(400).send(err);

      if(pings!=null){
        //Get username from jwt, **issue with null use
        pings.accuracy.push(req.body.accuracy);
        pings.altitude.push(req.body.altitude);
        pings.heading.push(req.body.heading);
        pings.latitude.push(req.body.latitude);
        pings.longitude.push(req.body.longitude);
        pings.speed.push(req.body.speed);
        pings.timestamp.push(req.body.timestamp);

        console.log('saving user Gps');

        pings.save(function(err) {

          if (err){
            console.log(err);
            res.status(400).send(err);
          }

          console.log('saved');
          res.status(201).json({ message: 'Location Saved!' });
        });
      }else{
        var newGps = new Gps();

        newGps.username = username;
        newGps.accuracy = req.body.accuracy;
        newGps.altitude = req.body.altitude;
        newGps.heading = req.body.heading;
        newGps.latitude = req.body.latitude;
        newGps.longitude = req.body.longitude;
        newGps.speed = req.body.speed;
        newGps.timestamp = req.body.timestamp;

        console.log('saving new user Gps');

        newGps.save(function(err) {

          if (err){
            console.log(err);
            res.status(400).send(err);
          }

          console.log('saved');
          res.status(201).json({ message: 'Location Saved!' });
        });
      }
    });
  });
});

module.exports = router;
