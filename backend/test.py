from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
MAX_FILE_SIZE = 300 * 1024 * 1024  # 300 MB
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Train the model
def train_model():
    credit_card_data = pd.read_csv('./creditcard.csv')

    # Prepare features and target variable
    X = credit_card_data.drop(columns=['Class'])
    Y = credit_card_data['Class']

    # Balance the dataset
    legit = credit_card_data[credit_card_data.Class == 0]
    fraud = credit_card_data[credit_card_data.Class == 1]
    legit_sample = legit.sample(n=492)  # downsample legitimate transactions
    new_dataset = pd.concat([legit_sample, fraud], axis=0)

    # Split the data
    X = new_dataset.drop(columns='Class', axis=1)
    Y = new_dataset['Class']

    # Scale the data
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X)
    X_test_scaled = scaler.transform(X)
    
    # Train Logistic Regression
    model = LogisticRegression(max_iter=100000, solver='liblinear', class_weight='balanced', C=0.1)
    model.fit(X_train_scaled, Y)
    
    return model, scaler

@app.route('/')
def home():
    return jsonify({"message": "Credit Card Fraud Detection API is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        model, scaler = train_model()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    if not model or not scaler:
        return jsonify({"error": "Model or scaler not loaded. Check your server logs."}), 500

    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Save the uploaded file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Load the file as a DataFrame
        data = pd.read_csv(file_path)

        # Validate required columns
        required_columns = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10']
        if not all(col in data.columns for col in required_columns):
            os.remove(file_path)  # Cleanup
            return jsonify({"error": "Uploaded file does not contain the required columns"}), 400

        # Scale the data
        scaled_data = scaler.transform(data[required_columns])

        # Make predictions
        predictions = model.predict(scaled_data)

        # Format results
        results = [{"index": idx, "prediction": "Fraudulent" if pred == 1 else "Legitimate"} for idx, pred in enumerate(predictions)]

        # Cleanup uploaded file
        os.remove(file_path)

        return jsonify({"results": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
