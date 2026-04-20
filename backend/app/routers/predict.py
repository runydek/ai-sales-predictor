from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import verify_token
from app.models.schemas import ErrorResponse, PredictRequest, PredictResponse
from app.services.predict_service import predict

router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post(
    "",
    response_model=PredictResponse,
    responses={500: {"model": ErrorResponse, "description": "Prediction failed"}},
)
def predict_status(
    body: PredictRequest,
    username: str = Depends(verify_token),
):
    try:
        return predict(body)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Model or scaler file not found. Run ML training first.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
