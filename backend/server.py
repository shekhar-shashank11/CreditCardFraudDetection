from flask import Flask, request, render_template, jsonify
import pandas as pd
import joblib
import os
from flask_cors import CORS
from sklearn.impute import SimpleImputer

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

    # Get the selected model from the request (defaults to Logistic Regression)
    model_choice = request.form.get("model", "LogisticRegression")

    # Choose the appropriate model
    if model_choice == "LogisticRegression":
        model = model_logistic
    elif model_choice == "RandomForestClassifier":
        model = model_rf
    else:
        return jsonify({"error": "Invalid model choice"})

    # Ensure data matches the model features
    predictions = model.predict(data_imputed)

    # Convert predictions into a readable format
    results = [{"Transaction": i+1, "Fraudulent": bool(pred)} for i, pred in enumerate(predictions)]

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
