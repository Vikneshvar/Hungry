var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Bank (Item) Schema
var PlaidItemSchema = mongoose.Schema({
  plaidItemId: {
    type: String,
    index:true
  },
  accessToken: String,
  emailId: String,
  userId: String,
  accounts:[{
    plaidItemId: String,
    account_id: String,
    account: Number,
    routing: Number,
    wire_routing: Number,
    balances: {
      available: Number,
        current: Number,
        limit: Number
    },
    mask: String,
    name: String,
    official_name: String,
    sub_type: String,
    type: {type: String},
    date_added: Date,
    last_checked: Date
  }],
  numbers:[{
    account: Number,
    account_id: String,
    routing: Number,
    wire_routing: Number
  }],
  income:String,
  identity:String
});

var PlaidItem = module.exports = mongoose.model('PlaidItem', PlaidItemSchema);

module.exports.createPlaidItem = function(newItem, callback){
  newItem.save(callback);
}

module.exports.getItem = function(itemId,email, callback){
  var query = {plaidItemId: itemId,emailId:email};
  PlaidItem.findOne(query, callback);
}

module.exports.updatePlaidAccount = function(conditions, data, callback){  
  var dataCheck=JSON.stringify(data)
  var obj = JSON.parse(dataCheck);
  console.log('data length: ',obj.length);
  if(obj.length==2){
    // Have both account and number data
    var query = {plaidItemId:conditions.plaidItemId,emailId:conditions.emailId};
    PlaidItem.findOneAndUpdate(query,{accounts:data.accounts,numbers:data.numbers},
    {new:true},callback);
  } else {
    // Have only account data
    var query = {plaidItemId:conditions.plaidItemId,emailId:conditions.emailId};
    PlaidItem.findOneAndUpdate(query,{accounts:data},
    {new:true},callback);
  }
  
}



