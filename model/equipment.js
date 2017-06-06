var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentSchema = new Schema({
  name: String,
  created_at: Date,
  updated_at: Date,
  color: Number,
  width: Number,
  length: Number
});

equipmentSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;