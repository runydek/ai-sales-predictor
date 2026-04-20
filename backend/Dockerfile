FROM python:3.11-slim

WORKDIR /app

COPY ml/requirements.txt /tmp/ml-requirements.txt
COPY backend/requirements.txt /tmp/backend-requirements.txt
RUN pip install --no-cache-dir -r /tmp/backend-requirements.txt -r /tmp/ml-requirements.txt

COPY data/ /data/
COPY ml/model.joblib ml/scaler.joblib /ml/
COPY backend/ /app/

EXPOSE 8000

ENV DATA_PATH=/data/sales_data.csv
ENV MODEL_PATH=/ml/model.joblib
ENV SCALER_PATH=/ml/scaler.joblib

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
