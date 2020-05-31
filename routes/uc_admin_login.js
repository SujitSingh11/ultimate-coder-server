const express = require("express");
const Joi = require("@hapi/joi");
const ucAdminUser = require("../models/uc_admin_model");
const ucAdminRouter = express.Router();

// Validation Schema
const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().trim().min(3).required(),
  first_name: Joi.string().trim().min(3).required(),
  last_name: Joi.string().trim().min(3).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().trim().min(3).required(),
});

// Routes
ucAdminRouter.post("/register", async (req, res) => {
  try {
    try {
      await registerSchema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newUser = new ucAdminUser({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    const userExist = await ucAdminUser
      .findOne({ username: req.body.username })
      .countDocuments();

    if (userExist > 0) {
      console.log(userExist);
      return res.status(400).send("User already exist!");
    } else {
      const savedUser = await newUser.save();
      return res.send(savedUser);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

ucAdminRouter.get("/login", async (req, res) => {
  try {
    try {
      await loginSchema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userExist = await ucAdminUser
      .findOne({ username: req.body.username })
      .countDocuments();

    if (userExist > 0) {
      const userValidation = await ucAdminUser
        .findOne({
          username: req.body.username,
          password: req.body.password,
        })
        .countDocuments();
      if (userValidation > 0) {
        return res.status(200).send("Logged In");
      } else {
        return res.status(400).send("Incorrect Password");
      }
    } else {
      return res.status(400).send("User dosen't exist!");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Export Route
module.exports = ucAdminRouter;
