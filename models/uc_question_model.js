const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ucQuestionsSchema = new Schema({
  question_type: {
    type: Number,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    unique: true,
    required: true,
  },
  choice_1: {
    type: String,
    required: true,
  },
  choice_2: {
    type: String,
    required: true,
  },
  choice_3: {
    type: String,
    required: true,
  },
  choice_4: {
    type: String,
    required: true,
  },
  correct_option: {
    type: Number,
    required: true,
  },
});

const UCQuestions = mongoose.model("uc_questions", ucQuestionsSchema);

module.exports = UCQuestions;
