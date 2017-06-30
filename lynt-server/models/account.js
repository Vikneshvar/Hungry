var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var PlaidAccountSchema = mongoose.Schema({
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
});

var PlaidAccount = module.exports = mongoose.model('PlaidAccount', PlaidAccountSchema);

var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt

module.exports.createAccount = function(newAccount, callback){

	console.log("newAccount: ", newAccount);
    newAccount.save(callback);

	/*
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


	var hashAccount = bcrypt.hashSync(newAccount.account, salt);
	var hashRouting = bcrypt.hashSync(newAccount.routing, salt);
	var hashWireRouting = bcrypt.hashSync(newAccount.wire_routing, salt);
	newAccount.account = hashAccount;
	newAccount.routing = hashRouting;
	newAccount.wire_routing = hashWireRouting;
    newAccount.save(callback);

    */
}

module.exports.getAccount = function(newAccount, callback){
	var hashAccount = bcrypt.hashSync(newAccount.account, salt);
	var hashRouting = bcrypt.hashSync(newAccount.routing, salt);
	var hashWireRouting = bcrypt.hashSync(newAccount.wire_routing, salt);
	newAccount.account = hashAccount;
	newAccount.routing = hashRouting;
	newAccount.wire_routing = hashWireRouting;
    newAccount.save(callback);
}

module.exports.updateAccount = function(newAccount, callback){
	var hashAccount = bcrypt.hashSync(newAccount.account, salt);
	var hashRouting = bcrypt.hashSync(newAccount.routing, salt);
	var hashWireRouting = bcrypt.hashSync(newAccount.wire_routing, salt);
	newAccount.account = hashAccount;
	newAccount.routing = hashRouting;
	newAccount.wire_routing = hashWireRouting;
    newAccount.save(callback);
}

module.exports.deleteAccount = function(newAccount, callback){
	var hashAccount = bcrypt.hashSync(newAccount.account, salt);
	var hashRouting = bcrypt.hashSync(newAccount.routing, salt);
	var hashWireRouting = bcrypt.hashSync(newAccount.wire_routing, salt);
	newAccount.account = hashAccount;
	newAccount.routing = hashRouting;
	newAccount.wire_routing = hashWireRouting;
    newAccount.save(callback);
}

