import React from 'react';
import Card from '../common/Card';

const mockSolverCode = { 
    'solver-001': `
# Basic Financial Forecaster

def run_forecast(data, parameters):
    print("Starting financial forecast...")
    
    # Extract parameters
    future_periods = parameters.get('future_periods', 12)
    growth_assumption = parameters.get('growth_assumption', 1.02)
    
    print(f"Forecasting for {future_periods} periods.")
    
    # Simple forecasting logic (example)
    last_period = data.iloc[-1]
    forecast_data = []
    for i in range(1, future_periods + 1):
        # Note: This is a simplistic, non-validated growth model
        new_revenue = last_period['revenue'] * (growth_assumption ** i)
        new_expenses = last_period['expenses'] * ((growth_assumption - 0.005) ** i) # Expenses grow slower
        forecast_data.append({
            'period': i,
            'projected_revenue': new_revenue,
            'projected_expenses': new_expenses,
            'projected_profit': new_revenue - new_expenses
        })
        
    print("Forecast calculation complete.")
    return forecast_data
`,
    'solver-002': `
# Quantum Monte Carlo Option Pricer
from qiskit import Aer
from qiskit.utils import QuantumInstance
from qiskit_finance.applications.estimation import EuropeanCallPricing

def run_qmc_pricing(parameters):
    print("Initializing Qiskit Aer backend for simulation.")
    
    # Extract and validate parameters
    num_uncertainty_qubits = 3
    spot_price = parameters.get('spot_price', 100)
    strike_price = parameters.get('strike_price', 100)
    volatility = parameters.get('volatility', 0.2)
    risk_free_rate = parameters.get('risk_free_rate', 0.05)
    maturity = parameters.get('maturity', 1) # 1 year
    shots = parameters.get('shots', 1024)

    print(f"Pricing European call option with {shots} shots.")

    # Set up the uncertainty model
    uncertainty_model = ... # Placeholder for Qiskit model setup
    
    # Set up the EuropeanCallPricing application
    european_call_pricing = EuropeanCallPricing(
        num_state_qubits=num_uncertainty_qubits,
        strike_price=strike_price,
        rescaling_factor=0.25, # Example factor
        bounds=(spot_price * 0.8, spot_price * 1.2), # Example bounds
        uncertainty_model=uncertainty_model,
    )

    # Set up QuantumInstance
    quantum_instance = QuantumInstance(
        backend=Aer.get_backend('qasm_simulator'),
        shots=shots,
        seed_simulator=42, # For reproducibility
        seed_transpiler=42,
    )

    print("Executing quantum simulation via Qiskit Runtime...")
    result = european_call_pricing.run(quantum_instance)
    
    print("Simulation finished.")
    return {
        'estimated_price': result['estimation'],
        'confidence_interval': result['confidence_interval'],
        'qiskit_version': '0.39.0'
    }
`
};

export const mockExecution = {
    timeline: [
        { id: 1, name: 'Session Created', status: 'Completed', time: '10:01:00 AM' },
        { id: 2, name: 'Data Profiled', status: 'Completed', time: '10:01:05 AM' },
        { id: 3, name: 'Solver Selected', status: 'Completed', time: '10:01:15 AM' },
        { id: 4, name: 'Mapping Approved', status: 'Completed', time: '10:01:40 AM' },
        { id: 5, name: 'Python Job Prepared', status: 'Running', time: '10:01:42 AM' },
        { id: 6, name: 'Executing...', status: 'Pending', time: null },
        { id: 7, name: 'Results Generated', status: 'Pending', time: null },
    ],
    logs: [
        { time: '10:01:42.100', stage: 4, message: 'Preparing Python execution environment.' },
        { time: '10:01:42.500', stage: 4, message: 'Serializing dataset and parameters.' },
        { time: '10:01:43.000', stage: 5, message: 'Starting job execution via Cloud Run proxy.' },
        { time: '10:01:44.200', stage: 5, message: '[Solver] Initializing Qiskit Aer backend for simulation.' },
        { time: '10:01:44.800', stage: 5, message: '[Solver] Pricing European call option with 1024 shots.' },
        { time: '10:01:45.600', stage: 5, message: '[Solver] Executing quantum simulation via Qiskit Runtime...' },
    ],
    quantumDetails: {
        backend: 'local_simulation',
        framework: 'Qiskit + Aer',
        shots: 1024,
        seed: 42,
        transpilation: 'Level 3 (default)',
    }
};


function ParameterEditor({ solver }) {
  if (!solver || !solver.parameters) return null;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Solver Parameters</h3>
      <div className="space-y-4">
        {solver.parameters.map(param => (
          <div key={param.id">
            <label htmlFor={param.id} className="block text-sm font-medium text-gray-700">
              {param.name} <span className="text-gray-400">({param.type})</span>
            </label>
            <input
              type={param.type === 'integer' ? 'number' : 'text'}
              id={param.id}
              defaultValue={param.defaultValue}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">{param.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ParameterEditor;
