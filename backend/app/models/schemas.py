from typing import List, Optional

from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class PredictRequest(BaseModel):
    jumlah_penjualan: float
    harga: float
    diskon: float


class PredictResponse(BaseModel):
    status: str
    confidence: float


class SalesItem(BaseModel):
    product_id: str
    product_name: str
    jumlah_penjualan: int
    harga: int
    diskon: int
    status: str


class SalesResponse(BaseModel):
    total: int
    data: List[SalesItem]


class ErrorResponse(BaseModel):
    error: str
    detail: str
