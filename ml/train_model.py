import os
import sys
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "sales_data.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.joblib")


def load_data():
    df = pd.read_csv(DATA_PATH)
    print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
    print(f"Columns: {list(df.columns)}")
    print(f"\nStatus distribution:\n{df['status'].value_counts()}")
    return df


def preprocess(df):
    features = ["jumlah_penjualan", "harga", "diskon"]
    X = df[features].copy()
    y = df["status"].map({"Laris": 1, "Tidak": 0}).copy()

    print(f"\nFeatures: {features}")
    print(f"Feature stats:\n{X.describe()}")
    return X, y


def train_and_evaluate():
    df = load_data()
    X, y = preprocess(df)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"\nTrain size: {X_train.shape[0]}, Test size: {X_test.shape[0]}")

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)

    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n=== Evaluation Results ===")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=["Tidak", "Laris"]))
    print(f"Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    print(f"\nModel saved to: {MODEL_PATH}")
    print(f"Scaler saved to: {SCALER_PATH}")


if __name__ == "__main__":
    train_and_evaluate()
