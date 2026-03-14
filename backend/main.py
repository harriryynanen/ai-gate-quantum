
import os
import json
import importlib.util
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for local development to allow requests from the frontend
CORS(app)

# Base path where solvers are located
SOLVERS_BASE_PATH = 'solvers'

@app.route('/run_solver', methods=['POST'])
def handle_run_solver():
    """API endpoint to dynamically load and run a solver."""
    payload = request.get_json()

    solver_id = payload.get('solver_id')
    data = payload.get('data')
    params = payload.get('params')

    if not all([solver_id, data, params]):
        return jsonify({"error": "Missing required fields: solver_id, data, or params"}), 400

    try:
        # Construct the path to the solver module file
        solver_module_path = os.path.join(SOLVERS_BASE_PATH, f"{solver_id}.py")

        if not os.path.exists(solver_module_path):
            return jsonify({"error": f"Solver '{solver_id}' not found"}), 404

        # Dynamically load the solver module
        spec = importlib.util.spec_from_file_location(solver_id, solver_module_path)
        solver_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(solver_module)

        # Check if the module has the required 'run_solver' function
        if not hasattr(solver_module, 'run_solver'):
            return jsonify({"error": f"Solver '{solver_id}' is missing the 'run_solver' function"}), 500

        # Call the solver's function with the provided data and params
        result = solver_module.run_solver(data, params)

        return jsonify({"success": True, "result": result}), 200

    except Exception as e:
        # Log the error for debugging purposes
        app.logger.error(f"Error running solver '{solver_id}': {str(e)}")
        return jsonify({"error": "An internal error occurred while running the solver"}), 500

if __name__ == '__main__':
    # Use port 8080 as required by Google Cloud Run
    # Host '0.0.0.0' to be accessible from outside the container
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)), debug=True)
