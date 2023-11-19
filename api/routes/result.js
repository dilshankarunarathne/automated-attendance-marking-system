const express = require('express');
const Results = require('../models/Results'); 

const router = express.Router();

router.get('/:index', async (req, res) => {
  const { index } = req.params;
  
  try {
    const results = await Results.find({ index });
    console.log(results);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
