import joblib
import numpy as np

from app.config import MODEL_PATH, SCALER_PATH
from app.models.schemas import PredictRequest, PredictResponse


def predict(request: PredictRequest) -> PredictResponse:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)

    features = np.array([[request.jumlah_penjualan, request.harga, request.diskon]])
    features_scaled = scaler.transform(features)

    prediction = model.predict(features_scaled)
    probabilities = model.predict_proba(features_scaled)

    status_label = "Laris" if prediction[0] == 1 else "Tidak"
    confidence = float(np.max(probabilities[0]))

    return PredictResponse(status=status_label, confidence=round(confidence, 4))
