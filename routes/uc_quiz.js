const express = require("express");
const ucQuizRouter = express.Router();
const ucQuestions = require("../models/uc_question_model");

// Routes
ucQuizRouter.get("/quiz", async (req, res) => {
  try {
    try {
      const questions = (
        await ucQuestions.find(
          {},
          {
            correct_option: 0,
          }
        )
      ).map((question) => {
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

ucQuizRouter.post("/submit", async (req, res) => {
  try {
    let total_mark = 0;
    let question_id;
    let selected_option;
    let question_validate;
    const question_ids = req.body.question_ids;
    const selected_options = req.body.selected_options;
    for (let index = 0; index < question_ids.length; index++) {
      question_id = question_ids[index];
      selected_option = selected_options[index];
      question_validate = await ucQuestions
        .findById({ _id: question_id })
        .then((doc) => {
          return doc;
        })
        .catch((err) => {
          console.log(err);
        });
      if (selected_option == question_validate.correct_option) {
        total_mark += question_validate.mark;
      }
    }
    return res.status(200).send(req.body);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Export Route
module.exports = ucQuizRouter;
