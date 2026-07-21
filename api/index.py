import sys
import os
from pathlib import Path

# Add backend directory to sys.path for Vercel Serverless Function
root_dir = Path(__file__).parent.parent
backend_dir = root_dir / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Default environment fallbacks if MONGO_URL/DB_NAME are unset in Vercel environment
if "DB_NAME" not in os.environ:
    os.environ["DB_NAME"] = "studioform_db"
if "MONGO_URL" not in os.environ:
    os.environ["MONGO_URL"] = "mongodb://localhost:27017"

try:
    from server import app
except Exception as e:
    import logging
    import traceback
    err_str = str(e)
    tb_str = traceback.format_exc()
    logging.exception("Failed to import app from server.py")
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    app = FastAPI()
    
    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])
    async def fallback_route(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": f"Backend import error: {err_str}",
                "traceback": tb_str,
                "path": path
            }
        )
