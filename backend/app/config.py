import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.environ.get("DATA_PATH", os.path.join(BASE_DIR, "data", "sales_data.csv"))
MODEL_PATH = os.environ.get("MODEL_PATH", os.path.join(BASE_DIR, "ml", "model.joblib"))
SCALER_PATH = os.environ.get("SCALER_PATH", os.path.join(BASE_DIR, "ml", "scaler.joblib"))

JWT_SECRET = "supersecretkey-change-in-production"
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

DUMMY_USERNAME = "admin"
DUMMY_PASSWORD = "admin123"
