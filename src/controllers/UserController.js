// Model
const User = require("../models/User");

async function getUserInfo(req, res) {
  const id = req.params.id;

  //Check if user exists
  const userExists = await User.findById(id, "-password -email");

  if (!userExists) {
    return res.status(404).json({ msg: "User not found in database!" });
  }

  res.status(200).json({ userExists });
}

module.exports = { getUserInfo };