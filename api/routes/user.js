const express = require('express');
const User = require('../models/User'); // Replace with your actual User model path

const router = express.Router();

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { firstname, lastname, phone }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
