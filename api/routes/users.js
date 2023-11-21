const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});


//update user
router.put("/:id", async (req, res) => {
  const userGot = req.body.user.user;

  if (userGot._id == req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          index:req.body.index,
          phone: req.body.phone,
          email: req.body.email,
          gender: req.body.gender,
          dob: req.body.dateOfBirth,
          age: req.body.age,
        }
      }, {new: true});
      res.status(200).json(user);
    } catch (err) {
      console.log(err); 
      res.status(500).json(err);
    }
  }
});

module.exports = router;
