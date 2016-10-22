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

        var ping_data = JSON.parse(req.body.data);

        for(i=0; i<ping_data.length; i++){
          pings.accuracy.push(ping_data[i]["accuracy"]);
          pings.altitude.push(ping_data[i]["altitude"]);
          pings.heading.push(ping_data[i]["heading"]);
          pings.latitude.push(ping_data[i]["latitude"]);
          pings.longitude.push(ping_data[i]["longitude"]);
          pings.speed.push(ping_data[i]["speed"]);
          pings.timestamp.push(ping_data[i]["timestamp"]);
        }

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

        var ping_data = JSON.parse(req.body.data);

        for(i=0; i<ping_data.length; i++){
          newGps.accuracy.push(ping_data[i]["accuracy"]);
          newGps.altitude.push(ping_data[i]["altitude"]);
          newGps.heading.push(ping_data[i]["heading"]);
          newGps.latitude.push(ping_data[i]["latitude"]);
          newGps.longitude.push(ping_data[i]["longitude"]);
          newGps.speed.push(ping_data[i]["speed"]);
          newGps.timestamp.push(ping_data[i]["timestamp"]);
        }

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
