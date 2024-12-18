import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv("creditcard.csv")

# Handle missing values
for col in data.columns:
    if data[col].isnull().sum() > 0:
        if data[col].dtype == 'object':
            data[col].fillna(data[col].mode()[0], inplace=True)  # Replace with mode for categorical columns
        else:
            data[col].fillna(data[col].mean(), inplace=True)  # Replace with mean for numerical columns

# Features and target
X = data.drop(columns=["Class"])
y = data["Class"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForest model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Test accuracy
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

# Save the model
joblib.dump(model, "fraud_detection_model.pkl")

'''
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import joblib

# Load dataset
data = pd.read_csv("creditcard.csv")

# Handling null values
# Check for null values
print("Null values in each column:\n", data.isnull().sum())

## For numerical columns
for col in data.select_dtypes(include=["float64", "int64"]).columns:
    data[col] = data[col].fillna(data[col].mean())  # Replace with mean

# For categorical columns (if any)
for col in data.select_dtypes(include=["object"]).columns:
    data[col] = data[col].fillna(data[col].mode()[0])  # Replace with mode

# Features and target
X = data.drop(columns=["Class"])
y = data["Class"]


# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)


# Train a Logistic Regression model
model = LogisticRegression(max_iter=1000)  # Set max_iter to ensure convergence
model.fit(X_train, y_train)

# Test accuracy
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

# Save the model
joblib.dump(model, "fraud_detection_model.pkl")

'''