const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  index: {
    type: String,
    required: true
  },
  fingerprint_id: {
    type: Number,
    required: false
  },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
