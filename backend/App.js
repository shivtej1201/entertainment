const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const PORT = process.env.NV;

require("./src/db/conn");
app.use(cors());
app.use(express.json());
app.use(require("./src/controllers/addJobpostController"));
app.use(require("./src/controllers/artistController"));
app.use(require("./src/controllers/recruiterController"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server Is Running On This PORT:${PORT}`);
});
