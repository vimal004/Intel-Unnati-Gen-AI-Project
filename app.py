from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load XGBoost model
model = joblib.load("model.pkl")

# Difficulty Mapping
reverse_label_map = {0: "easy", 1: "medium", 2: "hard"}

@app.route("/predict", methods=["POST"])
def predict_difficulty():
    data = request.get_json()
    user_input = np.array([[data["correct"], data["avgTime"], data["retries"]]])
    predicted_label = model.predict(user_input)[0]
    
    return jsonify({"difficulty": reverse_label_map[predicted_label]})

@app.route("/",methods=["GET"])
def Home():
    return "This is the adaptive model API!"

if __name__ == "__main__":
    app.run(port=5001, debug=True)
