require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Hyperparameters
const app = express();
const port = 3000;

// Listener
app.listen(port, () => {
  console.log("Server running at " + port);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cross Origin Resourse
app.use(cors());

// Import Routes
const uchomeRoute = require("./routes/uc_home");
const ucAdminLoginRoute = require("./routes/uc_admin_login");
const ucQuizRouter = require("./routes/uc_quiz");

// Connect to Database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to Database!");
});

// Middelware
app.use("/api/uc_home", uchomeRoute);
app.use("/api/uc_admin_login", ucAdminLoginRoute);
app.use("/api/uc_quiz", ucQuizRouter);
