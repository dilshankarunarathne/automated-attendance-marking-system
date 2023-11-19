const express = require('express');
const Student = require('../models/Student'); 
const Results = require('../models/Results');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/result/:index', async (req, res) => {
    const { index } = req.params;
  
    try {
      const student = await Student.findOne({ index });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const result = new Results({
        index,
        semester: 'term test', 
        maths: req.body.maths,
        sinhala: req.body.sinhala,
        science: req.body.science,
        history: req.body.history,
        religion: req.body.religion,
        english: req.body.english,
        cat1: req.body.cat1,
        cat2: req.body.cat2,
        cat3: req.body.cat3
      });
  
      await result.save();
  
      res.json({ message: 'Results saved successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
