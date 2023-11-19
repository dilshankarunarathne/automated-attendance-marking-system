const express = require('express');
const Attendance = require('../models/Attendance'); 

const router = express.Router();

router.get('/date/:date', async (req, res) => {
  const { date } = req.params;

  try {
    const attendance = await Attendance.find({ date });
    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: 'No attendance record found for this date' });
    }
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/index/:index', async (req, res) => {
  const { index } = req.params;
  console.log(`Index received: ${index}`);
  try {
    const attendance = await Attendance.find({ index: index });
    console.log(`Attendance records found: ${JSON.stringify(attendance)}`);
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for this index' });
    }
    res.json(attendance);
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const allAttendance = await Attendance.find({});
    console.log(`All attendance records: ${JSON.stringify(allAttendance)}`);
    res.json(allAttendance);
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

/*
router.post('/mark/:fingerprint_data', async (req, res) => {
  const { fingerprint_data } = req.params;

  // Use fingerprint_data to find the student index number
  // This part is not included in the code because it depends on how you're handling fingerprint data

  const newAttendance = new Attendance({
    index: ,
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
*/

module.exports = router;
