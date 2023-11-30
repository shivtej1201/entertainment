// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// require("../db/conn");
// const jwt = require("jsonwebtoken");
// const admin = require("firebase-admin");
// const serviceAccount = require("../secure/serviceAccountKey.json");
// const User = require("../model/recruiterModel");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:
//     "https://entertainmentproject-385ff-default-rtdb.asia-southeast1.firebasedatabase.app/",
// });

// // Function to generate OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000);
// };

// // ADD RECRUITER REQUEST
// router.post("/recruiteradd", async (req, res) => {
//   const {
//     name,
//     companyname,
//     email,
//     phone,
//     password,
//     city,
//     workaddress,
//     weblink,
//     idproof,
//     recruiterlogo,
//   } = req.body;

//   if (
//     !name ||
//     !companyname ||
//     !email ||
//     !phone ||
//     !password ||
//     !city ||
//     !workaddress ||
//     !weblink ||
//     !idproof ||
//     !recruiterlogo
//   ) {
//     return res.status(422).json({ error: "Please fill in all information" });
//   }

//   try {
//     const userExist = await User.findOne({ $or: [{ email }, { phone }] });

//     if (userExist) {
//       return res.status(422).json({ error: "Email or phone number already exists" });
//     }

//     // Validate phone number length or other criteria before proceeding
//     if (phone.length < 10) {
//       return res.status(422).json({ error: "Invalid phone number" });
//     }

//     const otp = generateOTP();
//     const phoneWithCountryCode = `+91${phone}`; // Update the country code if needed

//     // Send OTP to user's phone number using Firebase Authentication
//     const auth = admin.auth();
//     await auth.createUser({
//       phoneNumber: phoneWithCountryCode,
//     });

//     // Save the UID in your database
//     const user = new User({
//       name,
//       companyname,
//       email,
//       phone,
//       password,
//       city,
//       workaddress,
//       otp,
//       weblink,
//       idproof,
//       recruiterlogo,
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();
//     res.status(201).json({ message: "User Registration Successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "User Registration Failed" });
//   }
// });

// // GET BY ID RECRUITER REQUEST

// router.get("/recruiterget/:id", async (req, res) => {
//   const _id = req.params.id;
//   let user;
//   try {
//     user = await User.findById({ _id });
//   } catch (e) {
//     console.log(e);
//   }
//   if (!user) {
//     res.status(400).send("Users Not Found");
//   } else {
//     res.status(200).json(user);
//   }
// });

// // UPDATE BY ID RECRUITER REQUEST

// router.put("/recruiterget/:id", async (req, res) => {
//   const _id = req.params.id;
//   const { name, phone, password, workaddress } = req.body;
//   let user;
//   try {
//     user = await User.findByIdAndUpdate(
//       { _id },
//       {
//         name,
//         phone,
//         password,
//         workaddress,
//       },
//       { new: true }
//     );
//   } catch (e) {
//     console.log(e);
//   }
//   if (!user) {
//     res.status(400).send("Users Not Found");
//   } else {
//     res.status(200).json(user);
//   }
// });

// // DELETE BY ID RECRUITER REQUEST

// router.delete("/recruiterget/:id", async (req, res) => {
//   const _id = req.params.id;
//   let user;
//   try {
//     user = await User.findByIdAndDelete({ _id });
//   } catch (e) {
//     console.log(e);
//   }
//   if (!user) {
//     res.status(400).send("Users Not Found");
//   } else {
//     res.status(200).json(user);
//   }
// });

// // LOGIN RECRUITER REQUEST
// router.post("/recruiterlogin", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(422)
//       .json({ error: "Please provide both email and password" });
//   }

//   try {
//     const recruiter = await User.findOne({ email });

//     if (!recruiter) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, recruiter.password);

//     if (!isPasswordMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate a token for authentication
//     const token = jwt.sign({ _id: recruiter._id }, process.env.JWT_SECRET);

//     res.status(200).json({ token: "Login Successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("../db/conn");
const jwt = require("jsonwebtoken");
const User = require("../model/recruiterModel");

// ADD RECRUITER REQUEST

router.post("/recruiteradd", async (req, res) => {
  const {
    name,
    companyname,
    email,
    phone,
    password,
    city,
    workaddress,
    weblink,
    idproof,
    recruiterlogo,
  } = req.body;

  if (
    !name ||
    !companyname ||
    !email ||
    !phone ||
    !password ||
    !city ||
    !workaddress ||
    !weblink ||
    !idproof ||
    !recruiterlogo
  ) {
    return res.status(422).json({ error: "please fill in all information" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const userPhone = await User.findOne({ phone });
    if (userPhone) {
      return res.status(422).json({ error: "Phone number already exists" });
    }
    const user = new User({
      name,
      companyname,
      email,
      phone,
      password,
      city,
      workaddress,
      weblink,
      idproof,
      recruiterlogo,
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

// GET ALL RECRUITER REQUEST

router.get("/recruiterget", async (req, res) => {
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

// GET BY ID RECRUITER REQUEST

router.get("/recruiterget/:id", async (req, res) => {
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

// UPDATE BY ID RECRUITER REQUEST

router.put("/recruiterget/:id", async (req, res) => {
  const _id = req.params.id;
  const { name, phone, password, workaddress } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      { _id },
      {
        name,
        phone,
        password,
        workaddress,
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

// DELETE BY ID RECRUITER REQUEST

router.delete("/recruiterget/:id", async (req, res) => {
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

// LOGIN RECRUITER REQUEST
router.post("/recruiterlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide both email and password" });
  }

  try {
    const recruiter = await User.findOne({ email });

    if (!recruiter) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, recruiter.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token for authentication
    const token = jwt.sign({ _id: recruiter._id }, process.env.JWT_SECRET);

    res.status(200).json({ token: "Login Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
