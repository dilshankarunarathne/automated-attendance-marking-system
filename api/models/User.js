const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    fingerprint_id: {
      type: Number,
      required: true,
    },
    has_registered: {
      type: Boolean,
      default: false,
      required: true,
    },
    phone:{
      type: String,
      required: true,
    },
    index:{
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    bmi: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
