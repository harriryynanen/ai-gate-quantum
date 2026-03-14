
from qiskit import QuantumCircuit, Aer, execute
from qiskit.quantum_info import Operator
import numpy as np

def solve(data):
    """
    Performs a search for a marked element in an unstructured database
    using Grover's algorithm on a Qiskit simulator.

    Args:
        data (dict): A dictionary containing:
            - 'database_size': The total number of items in the search space (must be a power of 2).
            - 'marked_element': The integer index of the item to find.

    Returns:
        dict: A dictionary containing the most probable result and measurement counts.
    """
    try:
        n = int(data.get('database_size', 4))
        if n <= 1 or (n & (n - 1)) != 0: # Must be a power of 2
             return {
                'status': 'error',
                'message': 'Database size must be a power of 2 and greater than 1.'
            }

        marked_element = int(data.get('marked_element', 0))
        if not (0 <= marked_element < n):
            return {
                'status': 'error',
                'message': 'Marked element must be within the database size.'
            }

        num_qubits = int(np.log2(n))
        
        # --- Oracle ---
        oracle_matrix = np.identity(n)
        oracle_matrix[marked_element, marked_element] = -1
        oracle_op = Operator(oracle_matrix)

        # --- Diffuser ---
        diffuser_circuit = QuantumCircuit(num_qubits)
        diffuser_circuit.h(range(num_qubits))
        diffuser_circuit.x(range(num_qubits))
        diffuser_circuit.h(num_qubits - 1)
        diffuser_circuit.mcx(list(range(num_qubits - 1)), num_qubits - 1)
        diffuser_circuit.h(num_qubits - 1)
        diffuser_circuit.x(range(num_qubits))
        diffuser_circuit.h(range(num_qubits))
        diffuser_op = Operator(diffuser_circuit)

        # --- Main Circuit ---
        grover_circuit = QuantumCircuit(num_qubits, num_qubits)
        grover_circuit.h(range(num_qubits))
        
        # Optimal number of iterations
        iterations = int(np.floor(np.pi / 4 * np.sqrt(n)))
        for _ in range(iterations):
            grover_circuit.append(oracle_op, range(num_qubits))
            grover_circuit.append(diffuser_op, range(num_qubits))
            
        grover_circuit.measure(range(num_qubits), range(num_qubits))

        # --- Execution ---
        simulator = Aer.get_backend('qasm_simulator')
        job = execute(grover_circuit, simulator, shots=1024)
        result = job.result()
        counts = result.get_counts(grover_circuit)
        
        # Find the most frequent result
        most_likely_result_bin = max(counts, key=counts.get)
        most_likely_result_int = int(most_likely_result_bin, 2)

        return {
            'status': 'success',
            'result': {
                'summary': f"Grover's algorithm finished. Found element: {most_likely_result_int}",
                'found_element': most_likely_result_int,
                'measurements': counts,
                'is_placeholder': False,
                'executed_on': 'qasm_simulator'
            }
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': f"An error occurred during Grover simulation: {str(e)}"
        }
