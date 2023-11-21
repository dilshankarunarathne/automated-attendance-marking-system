const express = require('express');
const mongoose = require("mongoose");
const Attendance = require('../models/Attendance'); 
const Mode = require('../models/Mode');
const User = require('../models/User');

const router = express.Router();

const sendEmail = require('../mailer');

// set mode -> tested OK
router.post('/mode', async (req, res) => {
    const is_register_mode = req.body.is_register_mode;
    const is_attendance_mode = req.body.is_attendance_mode;

    console.log('Setting mode... [register: ' + is_register_mode + ', attendance: ' + is_attendance_mode + ']');

    /*
        always set the document with
        "_id": {
            "$oid": "655ce17d192d287738cc9b53"
        }
    */

    // set register mode
    if (is_register_mode) {
        try {
            const mode = await Mode.findOne({ "_id": mongoose.Types.ObjectId("655ce17d192d287738cc9b53") });
            mode.is_register_mode = true;
            mode.is_attendance_mode = false;
            const savedMode = await mode.save();
            console.log(`Mode saved: ${JSON.stringify(savedMode)}`);
            res.json(savedMode);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // set attendance mode
    if (is_attendance_mode) {
        try {
            const mode = await Mode.findOne({ "_id": mongoose.Types.ObjectId("655ce17d192d287738cc9b53") });
            mode.is_register_mode = false;
            mode.is_attendance_mode = true;
            const savedMode = await mode.save();
            console.log(`Mode saved: ${JSON.stringify(savedMode)}`);
            res.json(savedMode);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
});

// get current mode -> tested OK
router.get('/mode', async (req, res) => {
    /*
        always get the document with
        "_id": {
            "$oid": "655ce17d192d287738cc9b53"
        }
    */
    try {
        const mode = await Mode.findOne({ "_id": mongoose.Types.ObjectId("655ce17d192d287738cc9b53") });
        console.log(`Current mode: ${JSON.stringify(mode)}`);
        res.json(mode);
    } catch (err) {
        console.error(`Error occurred: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
});

// mark attendance via fingerprint
router.post('/mark', async (req, res) => {
    const { fingerprint_id } = req.body;
    console.log(`Fingerprint received for attendance: ${fingerprint_id}`);

    // Use fingerprint_data to find the student index number
    const user = await User.findOne({ fingerprint_id: fingerprint_id });
    if (!user || fingerprint_id === undefined) {
        console.log('User not found');
        return res.status(404).send("user not found");
    }
    console.log("User found with fingerprint id " + fingerprint_id + " " + user.firstname);
    const fingerprintIndex = user.index;

    const newAttendance = new Attendance({
        index: fingerprintIndex,
        date: new Date(),
        timestamp: Date.now(),
        fingerprint_id: fingerprint_id
    });

    try {
        const savedAttendance = await newAttendance.save();
        console.log(`Attendance saved: ${JSON.stringify(savedAttendance)}`);
        res.json(savedAttendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    // Send email notification
    const email = user.email;
    console.log(`Sending attended notification to: ${email}`);
    // sendEmail(email, 'You have attended', '<b>You have attended to class...</b>');
});

module.exports = router;
