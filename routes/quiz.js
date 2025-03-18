const express = require("express");
const axios = require("axios");
const User = require("../models/User");

const router = express.Router();

// 📌 Submit Quiz Performance
router.post("/submit", async (req, res) => {
  const { username, topic, correct, avgTime, retries } = req.body;
  let user = await User.findOne({ username });

  if (!user) {
    user = new User({ username, quizzes: [] });
  }

  // Check if user has previous attempts
  const existingQuiz = user.quizzes.find((q) => q.topic === topic);
  let newDifficulty;

  if (existingQuiz) {
    // 🔥 Call AI Flask Service for Updated Difficulty
    try {
      const response = await axios.post("http://localhost:5001/predict", {
        correct,
        avgTime,
        retries,
      });

      let predictedDifficulty = response.data.difficulty;

      // 🔼 Increase difficulty if not "hard"
      const difficultyLevels = ["easy", "medium", "hard"];
      let currentLevelIndex = difficultyLevels.indexOf(existingQuiz.difficulty);
      if (currentLevelIndex < 2) {
        newDifficulty = difficultyLevels[currentLevelIndex + 1];
      } else {
        newDifficulty = "hard";
      }
    } catch (error) {
      return res.status(500).json({ error: "Prediction service failed" });
    }

    // Update quiz
    existingQuiz.correct = correct;
    existingQuiz.avgTime = avgTime;
    existingQuiz.retries = retries;
    existingQuiz.difficulty = newDifficulty;
  } else {
    // 🔥 First-time topic attempt, get difficulty from AI
    try {
      const response = await axios.post("http://localhost:5001/predict", {
        correct,
        avgTime,
        retries,
      });
      newDifficulty = response.data.difficulty;
    } catch (error) {
      return res.status(500).json({ error: "Prediction service failed" });
    }

    user.quizzes.push({ topic, correct, avgTime, retries, difficulty: newDifficulty });
  }

  await user.save();
  res.json({ message: "Quiz updated!", difficulty: newDifficulty });
});

// 📌 Fetch Quiz History
router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user.quizzes);
});

module.exports = router;
