from flask import Flask, request, render_template, jsonify
import pandas as pd
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = joblib.load("fraud_detection_model.pkl")

# Directory to store uploaded files
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure uploads folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["POST"])
def upload_file():
        # Check if file is uploaded
        if "file" not in request.files:
            return "No file part"
        file = request.files["file"]
        
        if file.filename == "":
            return "No selected file"

        # Save the uploaded file
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)

        # Process the CSV file
        data = pd.read_csv(file_path)
        
        # Ensure data matches the model features
        predictions = model.predict(data)

        # Convert predictions into a readable format
        results = [{"Transaction": i+1, "Fraudulent": bool(pred)} for i, pred in enumerate(predictions)]

        return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)