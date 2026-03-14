
import numpy as np
import json

def run_solver(data, params):
    """
    Monte Carlo Option Pricing Solver.

    Args:
        data (list): A list of dictionaries, where each dictionary represents an option
                     and contains 'spot_price', 'strike', 'volatility', 'maturity'.
        params (dict): A dictionary of parameters for the simulation, including
                       'risk_free_rate', 'simulations', and 'seed'.

    Returns:
        dict: A dictionary containing the simulation results.
    """
    np.random.seed(params.get('seed', None))
    
    simulations = params.get('simulations', 10000)
    risk_free_rate = params.get('risk_free_rate', 0.05)

    total_payoff = 0
    all_option_prices = []

    for option in data:
        S = option['spot_price']
        K = option['strike']
        T = option['maturity']
        sigma = option['volatility']
        
        # S(T) = S(0) * exp((r - 0.5 * sigma^2) * T + sigma * sqrt(T) * Z)
        random_draws = np.random.randn(simulations)
        ST = S * np.exp((risk_free_rate - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * random_draws)
        
        # Payoff for a European call option
        payoffs = np.maximum(ST - K, 0)
        
        # Discounted average payoff
        option_price = np.mean(payoffs) * np.exp(-risk_free_rate * T)
        all_option_prices.append(option_price)

    # For a portfolio, the simplest approach is to average the prices
    # A more complex solver could handle portfolio effects
    average_portfolio_price = np.mean(all_option_prices)
    
    # Calculate a simple confidence interval for the mean price
    std_dev_prices = np.std(all_option_prices)
    std_error = std_dev_prices / np.sqrt(len(all_option_prices))
    
    # 95% confidence interval delta
    ci_delta = 1.96 * std_error

    # Result structure based on UI mockups
    result = {
        "summary": {
            "solver": "mc_option_pricing",
            "version": "1.0",
            "num_options": len(data),
            "num_simulations": simulations,
            "expected_price": average_portfolio_price,
            "confidence_interval_95_delta": ci_delta
        }
    }
    
    return result

# Example of how to run this from a wrapper script (for testing)
# if __name__ == '__main__':
#     # This data would come from the data preparation step (e.g. uploaded CSV)
#     example_data = [
#         {'spot_price': 100, 'strike': 105, 'volatility': 0.2, 'maturity': 1.0},
#         {'spot_price': 102, 'strike': 105, 'volatility': 0.2, 'maturity': 1.0},
#         # ... more options
#     ]
    
#     # These params would come from the config step (UI form)
#     example_params = {
#         'risk_free_rate': 0.05,
#         'simulations': 100000,
#         'seed': 42
#     }
    
#     # Run the solver
#     final_result = run_solver(example_data, example_params)
    
#     # Output results as a JSON string
#     print(json.dumps(final_result, indent=4))
