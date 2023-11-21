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
    last_fingerprint_id : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Mode', ModeSchema);
