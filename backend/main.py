
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router

app = FastAPI(
    title="Quantum-AI Analytics POC",
    description="Backend for the transparent AI-assisted analytics and quantum simulation platform.",
    version="0.1.0",
)

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to the frontend's real origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main API router
app.include_router(router, prefix="/api/v1")

@app.get("/", tags=["Health"])
async def read_root():
    """Health check endpoint."""
    return {"status": "ok", "message": "Welcome to the Quantum-AI Analytics Backend"}

