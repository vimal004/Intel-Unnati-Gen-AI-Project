const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(
  cors({
    origin: "*", // Explicitly allow your frontend
    methods: "GET,POST", // Only allow needed methods
    allowedHeaders: "Content-Type", // Allow JSON requests
  })
);



const genAI = new GoogleGenerativeAI("AIzaSyAhLSNxek1FO343UFH1pDNKoAXFDUN8L1g");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("", (req, res) => {
  res.send("Gemini api server running");
});

app.post("/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
