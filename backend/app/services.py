
import time
import uuid
from typing import Dict, Any
from . import schemas

# --- In-Memory Database ---
# Using dictionaries to simulate database tables
MOCK_SESSIONS: Dict[str, Dict[str, Any]] = {}
MOCK_JOBS: Dict[str, Dict[str, Any]] = {}

# --- Mock Execution Data ---

QUANTUM_RESULTS = {
    "id": lambda job_id: f"res-{job_id}",
    "summary": "The quantum-inspired model identified a portfolio allocation that significantly reduces downside risk while capturing 95% of the potential upside, outperforming the classical baseline.",
    "rawOutput": {
        "optimal_weights": {
            "Quantum-Fund-A": 0.65,
            "Stable-Growth-B": 0.35
        },
        "sharpe_ratio": 2.8
    }
}

CLASSICAL_RESULTS = {
    "id": lambda job_id: f"res-{job_id}",
    "summary": "The classical Monte Carlo simulation found a conservative portfolio, but it is likely a local optimum and misses the higher-return opportunities identified by the quantum-inspired approach.",
    "rawOutput": {
        "optimal_weights": {
            "Traditional-Bond-Fund": 0.8,
            "Blue-Chip-Stock": 0.2
        },
        "sharpe_ratio": 1.9
    }
}

# --- Service Functions ---

def create_session(goal: str) -> Dict[str, Any]:
    session_id = f"session-{uuid.uuid4().hex[:8]}"
    new_session = {
        "id": session_id,
        "title": "New Session",
        "goal": goal,
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "dataset": {
            "id": "data-default",
            "name": "Default Risk Data.csv",
            "columns": [{"name": "TransactionID", "type": "string"}, {"name": "Amount", "type": "number"}, {"name": "RiskScore", "type": "number"}],
            "rowCount": 1000,
        },
        "job": None,
    }
    MOCK_SESSIONS[session_id] = new_session
    return new_session

def get_recommendation(session_id: str) -> Dict[str, Any]:
    return {
        "confidence": 0.92,
        "justification": "The problem structure (high-dimensional, combinatorial) is an excellent match for quantum-inspired annealing algorithms, which can explore vast solution spaces more effectively than classical solvers.",
        "recommendedMethod": {
            "id": "quantum_inspired_annealing",
            "name": "Quantum-Inspired Annealing",
            "type": "quantum_simulation",
            "advantages": ["Superior performance on complex problems", "Finds non-obvious solutions", "Handles uncertainty well"],
        },
        "alternateMethod": {
            "id": "classical_optimization",
            "name": "Classical Optimization (Monte Carlo)",
            "type": "classical",
            "reasoning": "A robust and well-understood classical method. It is faster for smaller datasets but may miss optimal solutions in highly complex scenarios. Recommended for baseline comparisons.",
        },
    }

def submit_job(session_id: str, config: schemas.JobConfig) -> Dict[str, Any]:
    if session_id not in MOCK_SESSIONS:
        return None

    job_id = f"job-{uuid.uuid4().hex[:8]}"
    new_job = {
        "id": job_id,
        "status": "queued", # Start in a queued state
        "createdAt": time.time(),
        "config": config.dict(),
        "results": None,
    }
    MOCK_JOBS[job_id] = new_job
    MOCK_SESSIONS[session_id]["job"] = new_job
    return MOCK_SESSIONS[session_id]

def get_job_status(job_id: str) -> Dict[str, Any]:
    job = MOCK_JOBS.get(job_id)
    if not job:
        return {"status": "failed", "timeline": [], "logs": []}

    elapsed = time.time() - job["createdAt"]
    
    # Simulate job lifecycle
    if elapsed < 3:
        job["status"] = "running"
        timeline = [
            schemas.TimelineEvent(stage=0, name="Queued", status="complete"),
            schemas.TimelineEvent(stage=1, name="Initializing", status="running"),
            schemas.TimelineEvent(stage=2, name="Solver Execution", status="pending"),
        ]
    elif elapsed < 8:
        job["status"] = "running"
        timeline = [
            schemas.TimelineEvent(stage=0, name="Queued", status="complete"),
            schemas.TimelineEvent(stage=1, name="Initializing", status="complete"),
            schemas.TimelineEvent(stage=2, name="Solver Execution", status="running"),
        ]
    else:
        job["status"] = "complete"
        timeline = [
            schemas.TimelineEvent(stage=0, name="Queued", status="complete"),
            schemas.TimelineEvent(stage=1, name="Initializing", status="complete"),
            schemas.TimelineEvent(stage=2, name="Solver Execution", status="complete"),
        ]

    return {
        "status": job["status"],
        "timeline": [event.dict() for event in timeline],
        "logs": [{"timestamp": "...", "message": f"Executing job... Elapsed: {elapsed:.2f}s"}]
    }


def get_results(job_id: str) -> Dict[str, Any]:
    job = MOCK_JOBS.get(job_id)
    if not job or job["status"] != "complete":
        return None

    if job.get("results"):
        return job["results"]

    method_type = job["config"]["method"]["type"]
    
    if method_type == "quantum_simulation":
        results_template = QUANTUM_RESULTS
    else:
        results_template = CLASSICAL_RESULTS
        
    results = {
        "id": results_template["id"](job_id),
        "summary": results_template["summary"],
        "rawOutput": results_template["rawOutput"]
    }

    job["results"] = results
    return results


def get_history() -> list:
    return list(MOCK_SESSIONS.values())
