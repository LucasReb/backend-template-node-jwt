// .env import
require("dotenv").config();

// libs import
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./router/routes");

const app = express();

// Config JSON
app.use(express.json());

// IMPORTANT - Keep this line after all imports and ".use"
app.use(routes);

// Database connection
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// DeprecationWarning Solution
mongoose.set("strictQuery", true);

// String connection MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@jobcluster0.ovea5e7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Successful connection to database!");
  })
  .catch((err) => console.log("Mongoose connection error:", err));


// IN .ENV ADD DB_USER DB_PASS AND JWT_SECRET