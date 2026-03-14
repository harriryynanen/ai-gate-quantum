
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Import the centralized solver registry
from backend.solvers.registry import registry
# Import the new recommendation engine
from backend.recommendation_engine import recommend_solvers

app = Flask(__name__)
CORS(app) # Enable CORS for local dev

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint to confirm the service is running."""
    return jsonify({"status": "healthy", "service": "solver-service"}), 200

@app.route('/solvers', methods=['GET'])
def list_available_solvers():
    """Endpoint to get the metadata of all available solvers."""
    return jsonify({"solvers": registry.list_solvers()})

@app.route('/recommend_solvers', methods=['POST'])
def handle_recommend_solvers():
    """API endpoint to get solver recommendations based on a problem profile."""
    problem_profile = request.get_json()

    if not problem_profile:
        return jsonify({"error": "Request body must be a valid JSON problem profile."}), 400

    try:
        recommendation = recommend_solvers(problem_profile)
        return jsonify(recommendation), 200
    except Exception as e:
        app.logger.error(f"Error in recommendation engine: {str(e)}")
        return jsonify({"error": "An internal error occurred during recommendation."}), 500

@app.route('/run_solver', methods=['POST'])
def handle_run_solver():
    """API endpoint to run a specific solver by its ID."""
    payload = request.get_json()

    solver_id = payload.get('solver_id')
    data = payload.get('data')
    params = payload.get('params')

    if not solver_id:
        return jsonify({"error": "Missing required field: solver_id"}), 400

    # Retrieve the solver from the registry
    solver = registry.get_solver(solver_id)

    if not solver:
        return jsonify({"error": f"Solver '{solver_id}' not found"}), 404
    
    # Basic validation (can be expanded)
    if solver.status != 'active-backend':
        return jsonify({"error": f"Solver '{solver_id}' is not active and cannot be executed."}), 400

    try:
        # Execute the solver's run method
        result = solver.run(data, params)
        return jsonify({"success": True, "result": result}), 200

    except Exception as e:
        app.logger.error(f"Error running solver '{solver_id}': {str(e)}")
        # In a real app, you might want more detailed error logging
        return jsonify({"error": "An internal error occurred while running the solver"}), 500

if __name__ == '__main__':
    # Use port from environment variable, default to 8080
    port = int(os.environ.get('PORT', 8080))
    # Host '0.0.0.0' to be accessible from outside the container
    app.run(host='0.0.0.0', port=port, debug=True)
