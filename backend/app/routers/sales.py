from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import verify_token
from app.models.schemas import ErrorResponse, SalesResponse
from app.services.sales_service import get_all_sales

router = APIRouter(prefix="/sales", tags=["Sales"])


@router.get(
    "",
    response_model=SalesResponse,
    responses={500: {"model": ErrorResponse, "description": "Failed to load data"}},
)
def get_sales(username: str = Depends(verify_token)):
    try:
        return get_all_sales()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Sales data file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
