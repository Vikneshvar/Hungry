var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Transaction = mongoose.Schema({
  plaidItemId: String,
  userId: String,
  transactions:[{
    account_id: String,
    amount: Number,
    category: String,
    category_id: String,
    date: String,
    location:{
      street: String,
      city: String,
      state: String,
      zip: String,
    }
    name: String,
    payment_meta: String,
    pending: String,
    pending_transaction_id: String,
    transaction_id: String,
    transaction_type: String,
  }]
});

var Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt

module.exports.createTransaction = function(newTransaction, callback){
  
  console.log("newTransaction: ", newTransaction);
  newTransaction.save(callback);

}