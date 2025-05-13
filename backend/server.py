from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os
from flask_cors import CORS
from sklearn.impute import SimpleImputer

app = Flask(__name__)
CORS(app)

# Load the pre-trained models
model_logistic = joblib.load("fraud_detection_model2.pkl")  # Logistic Regression model
model_rf = joblib.load("fraud_detection_model.pkl")         # Random Forest model

# Directory to store uploaded files
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the uploads folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["POST"])
def upload_file():
    # Check if file is uploaded
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    # Read and preprocess the CSV file
    data = pd.read_csv(file_path)
    imputer = SimpleImputer(strategy='mean')
    data_imputed = pd.DataFrame(imputer.fit_transform(data), columns=data.columns)

    # Get selected model from request form (default is LogisticRegression)
    model_choice = request.form.get("model", "LogisticRegression")

    if model_choice == "LogisticRegression":
        predictions = model_logistic.predict(data_imputed)
        results = [{"Transaction": i + 1, "Fraudulent": bool(pred)} for i, pred in enumerate(predictions)]
        return jsonify(results)

    elif model_choice == "RandomForestClassifier":
        predictions = model_rf.predict(data_imputed)
        results = [{"Transaction": i + 1, "Fraudulent": bool(pred)} for i, pred in enumerate(predictions)]
        return jsonify(results)

    elif model_choice == "CombinedModel":
        # Predict probabilities from both models
        rf_probs = model_rf.predict_proba(data_imputed)[:, 1]
        lr_probs = model_logistic.predict_proba(data_imputed)[:, 1]

        # Average the probabilities
        combined_probs = (rf_probs + lr_probs) / 2
        combined_preds = combined_probs > 0.5

        # Return detailed combined results
        results = [
            {
                "Transaction": i + 1,
                "RandomForest_Probability": float(rf_prob),
                "LogisticRegression_Probability": float(lr_prob),
                "Combined_Probability": float(combined_prob),
                "Fraudulent": bool(pred)
            }
            for i, (rf_prob, lr_prob, combined_prob, pred) in enumerate(
                zip(rf_probs, lr_probs, combined_probs, combined_preds)
            )
        ]
        return jsonify(results)

    else:
        return jsonify({"error": "Invalid model choice. Choose 'LogisticRegression', 'RandomForestClassifier', or 'Combined'."}), 400


if __name__ == "__main__":
    app.run(debug=True)
