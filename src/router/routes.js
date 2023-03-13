const express = require("express");
const routes = express.Router();
const { registerUser, loginUser } = require("../controllers/authFunctions");
const { getUserInfo } = require("../controllers/getUserInfo");
const { checkToken } = require("../middlewares/checkToken");

// Open Route - Public Route
routes.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to API" });
});

// Register User
routes.post("/auth/register", async (req, res) => {
  registerUser(req, res);
});

// Login user
routes.post("/auth/login", async (req, res) => {
  loginUser(req, res);
});

// Private route
routes.get("/user/:id", checkToken, async (req, res) => {
  getUserInfo(req, res);
});

module.exports = routes;

module.exports = routes;
