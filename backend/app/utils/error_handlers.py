from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse


async def not_found_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "Not Found", "detail": str(exc.detail)},
    )


async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "detail": str(exc)},
    )
