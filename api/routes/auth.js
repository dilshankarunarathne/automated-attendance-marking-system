const router = require("express").Router();
const User = require("../models/User");
const Student = require("../models/Student");
const Mode = require("../models/Mode");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// get last fingerprint id 
function getLastFingerprintId() {
  return new Promise((resolve, reject) => {
      Mode.findOne({ "_id": mongoose.Types.ObjectId("655ce17d192d287738cc9b53") }, (err, mode) => {
          if (err) {
              reject(err);
          }
          resolve(mode.last_fingerprint_id);
      });
  });
}

//register
router.post("/register", async (req, res) => {
  let user = null;

  //get next fingerprint id

  // const users = await User.find();
  // let nextFingerprintId = 0;
  // users.forEach((user) => {
  //   if (user.fingerprint_id > nextFingerprintId) {
  //     nextFingerprintId = user.fingerprint_id;
  //   }
  // });
  // nextFingerprintId++;
  // console.log("next fingerprint id: " + nextFingerprintId);

  const lastFingerprintId = await getLastFingerprintId();
  const nextFingerprintId = lastFingerprintId + 1;
  console.log("next fingerprint id: " + nextFingerprintId);

  try {
    //generate ne password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new student 
    if (req.body.role === false) {
      //create new student
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        index: req.body.index,
        has_registered: false,
        fingerprint_id: nextFingerprintId,
      });
      console.log(newUser.phone)
      user = await newUser.save();

      const newName = req.body.firstname + " " + req.body.lastname;      
      const newStudent = new Student({
        index: req.body.index,
        name: newName,
      });
      const student = await newStudent.save();
    } else {
      //create new teacher
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        isAdmin: true,
      });

      //save user and return response
      user = await newUser.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json(error);
  }
});

//register fingerprint
router.post("/register-fingerprint", async (req, res) => {
  try {
    const fingerprint_id = req.body.fingerprint_id;
    const success = req.body.success;

    if (success) {
      const user = await User.findOne({ fingerprint_id: fingerprint_id });
      if (user) {
        user.has_registered = true;
        await user.save();
      }

      console.log("successful registration for fingerprint_id: " + fingerprint_id + " user: " + user.name);

      // update last fingerprint id
      const mode = await Mode.findOne({ "_id": mongoose.Types.ObjectId("655ce17d192d287738cc9b53") });
      mode.last_fingerprint_id = fingerprint_id;
      await mode.save();
    }
    
    res.status(200).json({ fingerprint_id, success });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('User not found');
      return res.status(404).send("user not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(400).json("wrong password");
    }

    res.status(200).json({ user, role: user.isAdmin });
  } catch (error) {
    console.log('Error:', error);
    res.status(200).json({ user, role: user.isAdmin });
  }
});

module.exports = router;
