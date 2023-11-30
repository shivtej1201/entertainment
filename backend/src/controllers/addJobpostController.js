const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("../db/conn");
const User = require("../model/addJobpostModel");

// ADD POST REQUEST

router.post("/postadd", async (req, res) => {
  const {
    projecttitle,
    projecttype,
    projectdetails,
    tag,
    duration,
    projectvalidity,
    language,
    roletitle,
    roletype,
    category,
    gender,
    agerange,
    numberofvacancy,
    auditionlocation,
    shotlocation,
    basedin,
    budget,
    passportrequired,
    auditionrequirement,
    roledescription,
  } = req.body;

  if (
    !projecttitle ||
    !projecttype ||
    !projectdetails ||
    !tag ||
    !duration ||
    !projectvalidity ||
    !language ||
    !roletitle ||
    !roletype ||
    !gender ||
    !agerange ||
    !numberofvacancy ||
    !auditionlocation ||
    !shotlocation ||
    !basedin ||
    !budget ||
    !passportrequired ||
    !auditionrequirement ||
    !roledescription
  ) {
    return res.status(422).json({ error: "please fill in all information" });
  }

  try {
    const user = new User({
      projecttitle,
      projecttype,
      projectdetails,
      tag,
      duration,
      projectvalidity,
      language,
      roletitle,
      roletype,
      category,
      gender,
      agerange,
      numberofvacancy,
      auditionlocation,
      shotlocation,
      basedin,
      budget,
      passportrequired,
      auditionrequirement,
      roledescription,
    });
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
    // user.cpassword = await bcrypt.hash(cpassword, salt);

    await user.save();
    res.status(201).json({ message: "Post Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid Post" });
  }
});

// GET ALL POST REQUEST

router.get("/postaddget", async (req, res) => {
  let user;
  try {
    user = await User.find();
  } catch (e) {
    console.log(e);
  }
  if (!user) {
    res.status(400).send("Users Not Found");
  } else {
    res.status(200).json(user);
  }
});

// GET BY ID POST REQUEST

router.get("/postaddget/:id", async (req, res) => {
  const _id = req.params.id;
  let user;
  try {
    user = await User.findById({ _id });
  } catch (e) {
    console.log(e);
  }
  if (!user) {
    res.status(400).send("Users Not Found");
  } else {
    res.status(200).json(user);
  }
});

// UPDATE BY ID POST REQUEST

router.put("/postaddget/:id", async (req, res) => {
  const _id = req.params.id;
  const {
    projecttitle,
    projecttype,
    projectdetails,
    tag,
    duration,
    projectvalidity,
    language,
    roletitle,
    roletype,
    category,
    gender,
    agerange,
    numberofvacancy,
    auditionlocation,
    shotlocation,
    basedin,
    budget,
    passportrequired,
    auditionrequirement,
    roledescription,
  } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      { _id },
      {
        projecttitle,
        projecttype,
        projectdetails,
        tag,
        duration,
        projectvalidity,
        language,
        roletitle,
        roletype,
        category,
        gender,
        agerange,
        numberofvacancy,
        auditionlocation,
        shotlocation,
        basedin,
        budget,
        passportrequired,
        auditionrequirement,
        roledescription,
      },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }
  if (!user) {
    res.status(400).send("Users Not Found");
  } else {
    res.status(200).json(user);
  }
});

// DELETE BY ID POST REQUEST

router.delete("/postaddget/:id", async (req, res) => {
  const _id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete({ _id });
  } catch (e) {
    console.log(e);
  }
  if (!user) {
    res.status(400).send("Users Not Found");
  } else {
    res.status(200).json(user);
  }
});

module.exports = router;
