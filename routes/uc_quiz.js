const express = require("express");
const ucQuizRouter = express.Router();
const ucQuestions = require("../models/uc_question_model");

// Routes
ucQuizRouter.get("/quiz", async (req, res) => {
  try {
    try {
      const questions = (await ucQuestions.find()).map((question) => {
        return question;
      });
      return res.status(200).send(questions);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

ucQuizRouter.post("/submit", (req, res) => {
  try {
    return res.status(200).send(req.body);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Export Route
module.exports = ucQuizRouter;
