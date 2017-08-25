const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema ({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  }
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;