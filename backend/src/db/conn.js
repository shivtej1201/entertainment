const mongoose = require("mongoose");
const DB = process.env.MONGO_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log("🚀_Connected Successfully_👻🚀");
  })
  .catch((err) => {
    console.error("☠️__Connection Error_☠️", err.message);
  });

module.exports = mongoose;
