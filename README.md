# Adaptive Quiz API

This project provides an adaptive quiz system using a **Flask-based AI model** for difficulty prediction and a **Node.js backend** for user and quiz management.

## 📌 Features
- Predicts quiz difficulty based on user performance using an **XGBoost** model.
- Stores user quiz history in **MongoDB**.
- **Automatically adjusts difficulty** for a topic on subsequent attempts.

---

## 🚀 Tech Stack
- **Backend**: Node.js, Express.js
- **AI Model**: Python (Flask, XGBoost)
- **Database**: MongoDB
- **Communication**: Axios (Node.js) ↔ Flask API

---

## 📂 Project Structure
```
📦 adaptive-quiz-api
 ┣ 📂 flask-api  # AI Model Service
 ┃ ┣ 📜 app.py   # Flask API for difficulty prediction
 ┃ ┣ 📜 model.pkl # Trained XGBoost model
 ┃ ┣ 📜 requirements.txt # Dependencies
 ┣ 📂 node-api  # Express.js Backend
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 quizRoutes.js  # API Routes
 ┃ ┣ 📂 models
 ┃ ┃ ┣ 📜 User.js  # Mongoose schema
 ┃ ┣ 📜 server.js # Main Express.js entry point
 ┣ 📜 README.md
 ┣ 📜 package.json
 ┣ 📜 .env  # Environment variables
```

---

## 🛠 Setup & Installation

### 1️⃣ Install Node.js Backend
```bash
cd node-api
npm install
```

### 2️⃣ Install Python Flask API
```bash
cd flask-api
pip install -r requirements.txt
```

---

## 🔥 Running the Project

### Start Flask AI API
```bash
cd flask-api
python app.py
```
(Default runs on **port 5001**)

### Start Node.js API
```bash
cd node-api
npm start
```
(Default runs on **port 3000**)

---

## 📝 API Endpoints

### 🎯 **Flask API (AI Model)**
| Endpoint       | Method | Description |
|---------------|--------|-------------|
| `/predict`    | `POST` | Predict quiz difficulty |

#### Example Request
```json
{
  "correct": 7,
  "avgTime": 5,
  "retries": 2
}
```
#### Response
```json
{
  "difficulty": "medium"
}
```

### 🎯 **Node.js API (Backend)**
| Endpoint       | Method | Description |
|---------------|--------|-------------|
| `/quiz/submit` | `POST` | Submit quiz performance |
| `/quiz/:username` | `GET` | Get user quiz history |

#### Example Quiz Submission
```json
{
  "username": "john_doe",
  "topic": "math",
  "correct": 8,
  "avgTime": 4,
  "retries": 1
}
```
#### Response
```json
{
  "message": "Quiz updated!",
  "difficulty": "hard"
}
```

---

## ⚡ Database Schema (MongoDB)
```json
{
  "username": "john_doe",
  "quizzes": [
    {
      "topic": "math",
      "correct": 8,
      "avgTime": 4,
      "retries": 1,
      "difficulty": "hard"
    }
  ]
}
```

---

## 📌 Notes
- Ensure **MongoDB** is running before starting the Node.js server.
- Flask AI API should be running **before** the Node.js API.
- Difficulty increases only if not already "hard".
