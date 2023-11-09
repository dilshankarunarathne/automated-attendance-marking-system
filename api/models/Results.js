const mongoose = require('mongoose');

const ResultsSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Results', ResultsSchema);
