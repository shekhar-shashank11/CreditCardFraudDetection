import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import joblib

# Load dataset
data = pd.read_csv("creditcard.csv")

for col in data.columns:
    if data[col].isnull().sum() > 0:
        if data[col].dtype == 'object':  # Categorical column
            data[col].fillna(data[col].mode()[0], inplace=True)
        else:  # Numerical column
            data[col].fillna(data[col].mean(), inplace=True)

# Features and target
X = data.drop(columns=["Class"])
y = data["Class"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Logistic Regression model
model = LogisticRegression(max_iter=1000)  # Set max_iter to ensure convergence
model.fit(X_train, y_train)

# Test accuracy
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

# Save the model
joblib.dump(model, "fraud_detection_model2.pkl")