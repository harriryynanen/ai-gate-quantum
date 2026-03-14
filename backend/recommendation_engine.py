
from backend.solvers.registry import registry

def recommend_solvers(problem_profile: dict):
    """
    A simple, rule-based recommendation engine that suggests solvers based on a structured problem profile.

    Args:
        problem_profile (dict): A dictionary describing the user's problem, e.g.,
            {
                'problem_type': 'finance.option_pricing',
                'user_goal': 'get_baseline' | 'explore_novel_approaches',
                'available_inputs': ['spot_price', 'strike', 'volatility', 'maturity']
            }

    Returns:
        dict: A recommendation object.
    """
    all_solvers = registry.list_solvers()
    problem_type = problem_profile.get('problem_type')
    user_goal = problem_profile.get('user_goal', 'get_baseline')
    available_inputs = set(problem_profile.get('available_inputs', []))

    if not problem_type:
        return {
            "recommended_path": "none",
            "candidate_solvers": [],
            "rationale": "A 'problem_type' must be specified to provide a recommendation.",
            "missing_inputs": [],
            "confidence": 0.0
        }

    # 1. Filter solvers that support the problem type
    eligible_solvers = [s for s in all_solvers if problem_type in s.get('supported_problem_types', [])]

    if not eligible_solvers:
        return {
            "recommended_path": "none",
            "candidate_solvers": [],
            "rationale": f"No solvers found that support the problem type '{problem_type}'.",
            "missing_inputs": [],
            "confidence": 0.1 # Low confidence as we don't have solvers for it
        }

    # 2. Check for input readiness and identify candidates
    candidate_solvers = []
    all_missing_inputs = {}
    for solver in eligible_solvers:
        required = set(solver.get('required_inputs', {}).keys())
        missing = list(required - available_inputs)
        
        if not missing:
            # Only consider solvers that can actually run or are active
            if solver['status'] in ['active-backend', 'prototype']:
                candidate_solvers.append(solver)
        else:
            all_missing_inputs[solver['id']] = missing

    if not candidate_solvers:
        return {
            "recommended_path": "none",
            "candidate_solvers": [],
            "rationale": "No solvers have their required inputs met. Please provide the necessary data.",
            "missing_inputs": all_missing_inputs,
            "confidence": 0.3
        }

    # 3. Apply simple heuristics based on user goal
    recommended_path = 'classical' # Default path
    rationale = ""

    # Sort candidates by maturity: active > prototype
    candidate_solvers.sort(key=lambda s: (s['status'] != 'active-backend', s['status'] != 'prototype'))

    if user_goal == 'explore_novel_approaches':
        # Prioritize Quantum/Hybrid if available
        quantum_candidates = [s for s in candidate_solvers if s['category'] == 'quantum']
        hybrid_candidates = [s for s in candidate_solvers if s['category'] == 'hybrid']
        if quantum_candidates:
            recommended_path = 'quantum'
            rationale = "Quantum path recommended for exploring novel approaches."
        elif hybrid_candidates:
            recommended_path = 'hybrid'
            rationale = "Hybrid path recommended as a bridge to novel approaches."
        else:
            rationale = "Classical path is the only one available for your problem, but it provides a solid baseline."
    else: # Default to 'get_baseline'
        classical_candidates = [s for s in candidate_solvers if s['category'] == 'classical']
        if classical_candidates:
             recommended_path = 'classical'
             rationale = "Classical path is recommended for obtaining a reliable baseline result."
        else:
            # If no classical, suggest the next best thing
            if any(s['category'] == 'hybrid' for s in candidate_solvers):
                recommended_path = 'hybrid'
                rationale = "No classical baseline solver available. A hybrid solver is the next best option."
            else:
                recommended_path = 'quantum'
                rationale = "No classical or hybrid solvers available. A quantum solver is your only option."

    return {
        "recommended_path": recommended_path,
        "candidate_solvers": [s['id'] for s in candidate_solvers],
        "rationale": rationale,
        "missing_inputs": all_missing_inputs, # Show what's missing for other non-candidate solvers
        "confidence": 0.85 # High confidence as it's a direct rule-based match
    }
