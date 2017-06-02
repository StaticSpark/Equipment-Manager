var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
  storeName: { type: String, required: true },
  storeCode: { type: Number, required: true },
  storeManager: [{type: Schema.Types.ObjectId, ref: 'User'}],
  equipment: [],
  created_at: Date,
  updated_at: Date
});

storeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Store = mongoose.model('Store', storeSchema);

module.exports = Store;