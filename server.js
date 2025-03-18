require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const quizRoutes = require("./routes/quiz");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
