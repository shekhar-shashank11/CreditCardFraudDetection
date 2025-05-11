from flask import Flask, request, render_template, jsonify
import pandas as pd
import joblib
import os
from flask_cors import CORS
from sklearn.impute import SimpleImputer
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the pre-trained models
model_logistic = joblib.load("fraud_detection_model2.pkl")  # Logistic Regression model
model_rf = joblib.load("fraud_detection_model.pkl")  # Random Forest model

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
    # Handle missing values with SimpleImputer
    imputer = SimpleImputer(strategy='mean')
    data_imputed = pd.DataFrame(imputer.fit_transform(data), columns=data.columns)

    # Ensure data matches the model features
    rf_predictions_prob = model_rf.predict_proba(data_imputed)[:, 1]  # Random Forest probabilities
    logistic_predictions_prob = model_logistic.predict_proba(data_imputed)[:, 1]  # Logistic Regression probabilities

    # Combine predictions (e.g., average probabilities)
    combined_predictions_prob = (rf_predictions_prob + logistic_predictions_prob) / 2
    combined_predictions = combined_predictions_prob > 0.5  # Threshold for fraud detection

    # Convert predictions into a readable format
    results = [
        {
            "Transaction": i + 1,
            "RandomForest_Probability": float(rf_prob),
            "LogisticRegression_Probability": float(lr_prob),
            "Combined_Probability": float(combined_prob),
            "Fraudulent": bool(combined_pred)
        }
        for i, (rf_prob, lr_prob, combined_prob, combined_pred) in enumerate(
            zip(rf_predictions_prob, logistic_predictions_prob, combined_predictions_prob, combined_predictions)
        )
    ]

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
