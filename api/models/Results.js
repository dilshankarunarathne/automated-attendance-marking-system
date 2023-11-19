const mongoose = require('mongoose');

const ResultsSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true,
    default: 'term test'
  },
  maths: {
    type: Number,
    default: 0
  },
  sinhala: {
    type: Number,
    default: 0
  },
  science: {
    type: Number,
    default: 0
  },
  history: {
    type: Number,
    default: 0
  },
  religion: {
    type: Number,
    default: 0
  },
  english: {
    type: Number,
    default: 0
  },
  cat1: {
    type: Number,
    default: 0
  },
  cat2: {
    type: Number,
    default: 0
  },
  cat3: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Results', ResultsSchema);
