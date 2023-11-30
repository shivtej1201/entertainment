// const mongoose = require("mongoose");
// const artistSchema = new mongoose.Schema({
//   pronoun: {
//     type: String,
//     require: true,
//   },
//   name: {
//     type: String,
//     require: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     require: true,
//     unique: true,
//   },
//   phone: {
//     type: Number,
//     require: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     require: true,
//   },
//   dob: {
//     type: String,
//     require: true,
//   },
//   language: {
//     type: String,
//     require: true,
//   },
//   category: {
//     type: String,
//     require: true,
//   },
//   location: {
//     type: String,
//     require: true,
//   },
//   gender: {
//     type: String,
//     require: true,
//   },
//   sociallinks: {
//     type: String,
//     require: true,
//   },
//   gallery: {
//     type: String,
//     require: true,
//   },
//   videos: {
//     type: String,
//     require: true,
//   },
//   photos: {
//     type: String,
//     require: true,
//   },
//   audios: {
//     type: String,
//     require: true,
//   },
//   document: {
//     type: String,
//     require: true,
//   },
//   aboutme: {
//     type: String,
//     require: true,
//   },
//   education: {
//     type: String,
//     require: true,
//   },
//   skills: {
//     type: String,
//     require: true,
//   },
//   workpreferance: {
//     type: String,
//     require: true,
//   },
//   otherinformation: {
//     type: String,
//     require: true,
//   },
// });
// module.exports = new mongoose.model("artist", artistSchema);


const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  pronoun: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    // required: true,
  },
  language: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  sociallinks: {
    type: String,
    // required: true,
  },
  gallery: {
    type: String,
    // required: true,
  },
  videos: {
    type: String,
    // required: true,
  },
  photos: {
    type: String,
    // required: true,
  },
  audios: {
    type: String,
    // required: true,
  },
  document: {
    type: String,
    // required: true,
  },
  aboutme: {
    type: String,
    // required: true,
  },
  education: {
    type: String,
    // required: true,
  },
  skills: {
    type: [String],
    // required: true,
  },
  workpreferance: {
    type: String,
    // required: true,
  },
  otherinformation: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("ARTIST", artistSchema);
