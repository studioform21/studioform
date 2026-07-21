import sys
import os
from pathlib import Path

# Add backend directory to sys.path for Vercel Serverless Function
backend_dir = Path(__file__).parent.parent
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
    logging.exception("Failed to import app from server.py")
    from fastapi import FastAPI
    app = FastAPI()
    @app.get("/api/health")
    def fallback_health():
        return {"status": "error", "message": str(e)}
