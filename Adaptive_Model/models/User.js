const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  quizzes: [
    {
      topic: String,
      correct: Number,
      avgTime: Number,
      retries: Number,
      difficulty: { type: String, default: "easy" }, // Track difficulty
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
