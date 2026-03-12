
from fastapi import APIRouter, HTTPException, Body
from typing import List
from . import schemas, services

router = APIRouter()

@router.post("/sessions", response_model=schemas.Session)
async def create_session_endpoint(request: schemas.CreateSessionRequest):
    session = services.create_session(goal=request.goal)
    return session

@router.get("/sessions/{session_id}/recommendation", response_model=schemas.Recommendation)
async def get_recommendation_endpoint(session_id: str):
    recommendation = services.get_recommendation(session_id=session_id)
    return recommendation

@router.post("/jobs", response_model=schemas.Session)
async def submit_job_endpoint(request: schemas.SubmitJobRequest):
    session = services.submit_job(session_id=request.sessionId, config=request.config)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.get("/jobs/{job_id}/status", response_model=schemas.JobStatusResponse)
async def get_job_status_endpoint(job_id: str):
    status = services.get_job_status(job_id=job_id)
    if not status:
        raise HTTPException(status_code=404, detail="Job not found")
    return status

@router.get("/jobs/{job_id}/results", response_model=schemas.JobResult)
async def get_results_endpoint(job_id: str):
    results = services.get_results(job_id=job_id)
    if not results:
        raise HTTPException(status_code=404, detail="Job not found or not complete")
    return results

@router.get("/history", response_model=List[schemas.Session])
async def get_history_endpoint():
    history = services.get_history()
    return history

# Note: The upload_dataset endpoint is omitted as it was not part of this refactoring pass.
# It can be added back in a similar fashion if needed.
