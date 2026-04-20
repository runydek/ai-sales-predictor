from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routers import auth, predict, sales
from app.utils.error_handlers import not_found_handler, unhandled_exception_handler

app = FastAPI(
    title="AI Sales Prediction API",
    description="Mini API for sales data management and product status prediction",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(404, not_found_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

app.include_router(auth.router)
app.include_router(sales.router)
app.include_router(predict.router)


@app.get("/")
def root():
    return JSONResponse(
        content={
            "message": "AI Sales Prediction API",
            "docs": "/docs",
            "version": "1.0.0",
        }
    )
