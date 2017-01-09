var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    index:true
  },
  password: {
    type: String
  },
  name: {
    first: String,
    last: String
  },
  devices: [{
    type: String
  }],
  banks: [{
    type: {type: String},
    token: String,
    status: String,
    nick: String,
    date_added: Date,
    last_checked: Date,
    accounts:[{
      numbers: {
        routing: Number,
        account: Number,
        wireRouting: Number
      },
      subtype: String,
      type: {type: String}
    }],
  }]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

module.exports.addBank = function(user, authRes){
  var d = Date();
  var accounts = [];
  for (i = 0; i < authRes.accounts.length; i++){
    var temp = {
      numbers:{
        routing: authRes.accounts[i].numbers.routing,
        account: authRes.accounts[i].numbers.account,
        wireRouting: authRes.accounts[i].numbers.wireRouting
      },
      subtype: authRes.accounts[i].subtype,
      type: authRes.accounts[i].type
    }
    accounts.push(temp);
  }
  var bank = {
    type: authRes.accounts[0].institution_type,
    token: authRes.access_token,
    status: "Pending",
    nick: authRes.accounts[0].institution_type,
    date_added: d,
    last_checked: d,
    accounts: accounts
  }
  console.log(bank);
  user.banks.push(bank);
  user.save();
}

module.exports.getUserByEmail = function(email, callback){
  var query = {email: email};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null, isMatch);
  });
}
