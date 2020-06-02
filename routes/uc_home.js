const express = require("express");
const homeRouter = express.Router();
const Joi = require("@hapi/joi");

// Routes
homeRouter.post("/start", (req, res) => {
  res.status(200).send(req);
});

// Export Route
module.exports = homeRouter;
