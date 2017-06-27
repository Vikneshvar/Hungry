var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Bank (Item) Schema
var PlaidItemSchema = mongoose.Schema({
  plaidItemId: {
    type: String,
    index:true
  },
  accessToken: {
    type: String
  },
  userId: {
    type: String
  }
});

var PlaidItem = module.exports = mongoose.model('PlaidItem', PlaidItemSchema);

module.exports.createPlaidItem = function(newItem, callback){
          newItem.save(callback);
}