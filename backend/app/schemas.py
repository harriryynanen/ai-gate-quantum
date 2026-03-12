
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

# --- Core Data Structures ---

class Method(BaseModel):
    id: str
    name: str
    type: str
    advantages: Optional[List[str]] = None
    reasoning: Optional[str] = None
    exploratory: Optional[bool] = False

class JobConfig(BaseModel):
    method: Method
    parameters: Dict[str, Any]

class JobResult(BaseModel):
    id: str
    summary: str
    rawOutput: Dict[str, Any]

class Job(BaseModel):
    id: str
    status: str
    createdAt: float
    config: JobConfig
    results: Optional[JobResult] = None

class Dataset(BaseModel):
    id: str
    name: str
    columns: List[Dict[str, str]]
    rowCount: int

class Session(BaseModel):
    id: str
    title: str
    goal: str
    createdAt: str
    dataset: Optional[Dataset] = None
    job: Optional[Job] = None

# --- API Payloads ---

class Recommendation(BaseModel):
    confidence: float
    justification: str
    recommendedMethod: Method
    alternateMethod: Method

class TimelineEvent(BaseModel):
    stage: int
    name: str
    status: str # pending, running, complete, failed

class JobStatusResponse(BaseModel):
    status: str
    timeline: List[TimelineEvent]
    logs: List[Dict[str, str]]

# --- Request Body Schemas ---

class CreateSessionRequest(BaseModel):
    goal: str = Field(..., description="The user's stated goal for the analysis session.")

class UploadDatasetRequest(BaseModel):
    sessionId: str
    dataset: Dict[str, Any]

class SubmitJobRequest(BaseModel):
    sessionId: str
    config: JobConfig
