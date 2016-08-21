var mongoose = require('mongoose');

// User Schema
var PingSchema = mongoose.Schema({
  userId: {
    type: String,
    index:true,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lon: {
    type: String,
    required: true
  },
  ts: {
    type: String,
    required: true
  }
});

var Ping = module.exports = mongoose.model('ping', PingSchema);

module.exports.getPingsById = function(id, callback){
  Ping.find().where('userId').eq(id).exec(function(err,pings) {
    if(err) throw err;
    return pings;
  });
}