const mongoose = require("mongoose");
const addJobpostSchema = new mongoose.Schema({
  projecttitle: {
    type: String,
    require: true,
  },
  projecttype: {
    type: String,
    require: true,
    unique: true,
  },
  projectdetails: {
    type: String,
    require: true,
    unique: true,
  },
  tag: {
    type: String,
    require: true,
    unique: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  projectvalidity: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  roletitle: {
    type: String,
    require: true,
  },
  roletype: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  gender: {
    type: Boolean,
    require: true,
  },
  agerange: {
    type: Number,
    require: true,
  },
  numberofvacancy: {
    type: String,
    require: true,
  },
  auditionlocation: {
    type: String,
    require: true,
  },
  shotlocation: {
    type: String,
    require: true,
  },
  basedin: {
    type: String,
    require: true,
  },
  budget: {
    type: Number,
    require: true,
  },
  passportrequired: {
    type: String,
    require: true,
  },
  auditionrequirement: {
    type: String,
    require: true,
  },
  roledescription: {
    type: String,
    require: true,
  },
});
module.exports = new mongoose.model("ADDPOST", addJobpostSchema);
