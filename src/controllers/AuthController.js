// Libs import
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

async function registerUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  // Validation of information
  if (!name) {
    return res.status(422).json({ msg: "Name is required on registration!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "Email is required on registration!" });
  }
  if (validator.validate(email) == false) {
    return res.status(422).json({ msg: "Please type a valid email!" });
  }
  if (!password) {
    return res
      .status(422)
      .json({ msg: "Password is required on registration!" });
  }
  if (!confirmPassword) {
    return res
      .status(422)
      .json({ msg: "Confirm the password is required on registration!" });
  }
  if (password != confirmPassword) {
    return res.status(422).json({ msg: "Passwords do not match!" });
  }

  // Check if user exists in database
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(422).json({ msg: "User already exists!" });
  }

  // Check if user exists in database
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "User registered successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  // Validation of information
  if (!email) {
    return res.status(422).json({ msg: "Email is required on login!" });
  }
  if (validator.validate(email) == false) {
    return res.status(422).json({ msg: "Please type a valid email!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Password is required on login!" });
  }

  // Check if user exists in database
  const userDatabase = await User.findOne({ email: email });
  if (!userDatabase) {
    return res.status(404).json({ msg: "User not found in database!" });
  }

  const checkPassword = await bcrypt.compare(password, userDatabase.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Invalid password!" });
  }

  try {
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: userDatabase._id,
      },
      secret
    );

    res.status(200).json({ msg: "Successfully authenticated", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

module.exports = { registerUser, loginUser };
