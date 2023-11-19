const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Student', StudentSchema);
