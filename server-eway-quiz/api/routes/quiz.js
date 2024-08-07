const express = require("express");
const router = express.Router();
const Quiz = require("../model/quizModel");
// To create new Quiz Questions
router.post("/createquiz", async (req, res) => {
  try {
    const { ...quizData } = req.body;
    const question = await Quiz.create(quizData);
    question.save();

    res.status(200).send(question);
  } catch (error) {
    //console.log(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
