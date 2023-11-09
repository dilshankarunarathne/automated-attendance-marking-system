const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRouter=require('./routes/auth');
const cors=require('cors');


//upload image
const multer = require("multer");
const path = require("path");

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth",authRouter);


// app.get("/", (req, res) => {
//   res.send("Welcome to home page");
// });

// app.get("/users", (req, res) => {
//   res.send("Welcome to user page");
// });



app.listen(8800, () => {
  console.log("Backend server is running");
});
