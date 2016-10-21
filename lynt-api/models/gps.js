var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var GpsSchema = mongoose.Schema({
  username: {
    type: String,
    index:true
  },
  accuracy: [{
    type: Number
  }],
  altitude: [{
    type: Number
  }],
  heading: [{
    type: Number
  }],
  latitude: [{
    type: Number
  }],
  longitude: [{
    type: Number
  }],
  speed: [{
    type: Number
  }],
  timestamp: [{
    type: Number
  }]
});

var Gps = module.exports = mongoose.model('Gps', GpsSchema);

module.exports.createGps = function(newGps, callback){
  newGps.save(callback);
}

module.exports.getGpsByUsername = function(username, callback){
  var query = {username: username};
  Gps.findOne(query, callback);
}
