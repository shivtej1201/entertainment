const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("../db/conn");
const jwt = require("jsonwebtoken");
const User = require("../model/artistModel");

// ADD ARTIST REQUEST

router.post("/artistadd", async (req, res) => {
  const {
    pronoun,
    name,
    email,
    phone,
    password,
    dob,
    language,
    category,
    location,
    gender,
    sociallinks,
    gallery,
    videos,
    photos,
    audios,
    document,
    aboutme,
    education,
    skills,
    workpreferance,
    otherinformation,
  } = req.body;

  if (
    !pronoun ||
    !name ||
    !email ||
    !phone ||
    !password ||
    !language ||
    !category ||
    !location ||
    !gender
  ) {
    return res.status(422).json({ error: "please fill in all information" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const userPhone = await User.findOne({ phone: phone });
    if (userPhone) {
      return res.status(422).json({ error: "Phone number already exists" });
    }

    const user = new User({
      pronoun,
      name,
      email,
      phone,
      password,
      dob,
      language,
      category,
      location,
      gender,
      sociallinks,
      gallery,
      videos,
      photos,
      audios,
      document,
      aboutme,
      education,
      skills,
      workpreferance,
      otherinformation,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid Username" });
  }
});

// GET ALL ARTIST REQUEST

router.get("/artistget", async (req, res) => {
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

// GET BY ID ARTIST REQUEST

router.get("/artistget/:id", async (req, res) => {
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

// UPDATE BY ID ARTIST REQUEST

router.put("/artistget/:id", async (req, res) => {
  const _id = req.params.id;
  const {
    pronoun,
    name,
    email,
    phone,
    password,
    dob,
    language,
    category,
    location,
    gender,
    sociallinks,
    gallery,
    videos,
    photos,
    audios,
    document,
    aboutme,
    education,
    skills,
    workpreferance,
    otherinformation,
  } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      { _id },
      {
        pronoun,
        name,
        email,
        phone,
        password,
        dob,
        language,
        category,
        location,
        gender,
        sociallinks,
        gallery,
        videos,
        photos,
        audios,
        document,
        aboutme,
        education,
        skills,
        workpreferance,
        otherinformation,
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

// DELETE BY ID ARTIST REQUEST

router.delete("/artistget/:id", async (req, res) => {
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

// LOGIN ARTIST REQUEST

router.post("/artistlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token for authentication
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token: "Login Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
