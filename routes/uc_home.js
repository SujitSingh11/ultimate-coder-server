const express = require("express");
const homeRouter = express.Router();
const Joi = require("@hapi/joi");

// Routes
homeRouter.get("/api/start", (req, res) => {
  res.send("We are home!");
});

// Export Route
module.exports = homeRouter;
