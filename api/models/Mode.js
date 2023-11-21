const mongoose = require('mongoose');

const ModeSchema = new mongoose.Schema({
    is_register_mode : {
        type: Boolean,
        default: false,
        required: true
    },
    is_attendance_mode : {
        type: Boolean,
        default: false,
        required: true
    },
});

module.exports = mongoose.model('Mode', ModeSchema);
