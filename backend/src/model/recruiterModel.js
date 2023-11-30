const mongoose = require("mongoose");
const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    // unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  workaddress: {
    type: String,
    required: true,
  },
  weblink: {
    type: String,
    required: true,
  },
  idproof: {
    type: String,
    required: true,
  },
  recruiterlogo: {
    type: String,
    required: true,
  },
});
module.exports = new mongoose.model("RECRUITER", recruiterSchema);

// WBK57eoKLnOQwJVK
