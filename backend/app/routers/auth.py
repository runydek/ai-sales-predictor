from fastapi import APIRouter, HTTPException, status

from app.dependencies import create_access_token
from app.models.schemas import LoginRequest, LoginResponse
from app.services.auth_service import authenticate_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/login",
    response_model=LoginResponse,
    responses={401: {"description": "Invalid credentials"}},
)
def login(body: LoginRequest):
    if not authenticate_user(body.username, body.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    token = create_access_token(data={"sub": body.username})
    return LoginResponse(access_token=token, token_type="bearer")
