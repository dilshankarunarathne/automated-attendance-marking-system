const express = require('express');
const Attendance = require('../models/Attendance'); 

const router = express.Router();

router.get('/date/:date', async (req, res) => {
  const { date } = req.params;

  try {
    const attendance = await Attendance.find({ date });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/index/:index', async (req, res) => {
  const { index } = req.params;

  try {
    const attendance = await Attendance.find({ index });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/mark/:fingerprint_data', async (req, res) => {
  const { fingerprint_data } = req.params;

  // Use fingerprint_data to find the student index number
  // This part is not included in the code because it depends on how you're handling fingerprint data

  const newAttendance = new Attendance({
    index:,
    date: new Date(),
    timestamp: Date.now()
  });

  try {
    const savedAttendance = await newAttendance.save();
    res.json(savedAttendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
