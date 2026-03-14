
import numpy as np
from backend.solvers.base import BaseSolver

class MonteCarloOptionPricingSolver(BaseSolver):
    """
    A classical Monte Carlo solver for pricing European call options.
    This implementation serves as a reference for the classical solver category.
    """

    @property
    def id(self) -> str:
        return "mc_option_pricing"

    @property
    def name(self) -> str:
        return "Monte Carlo Option Pricer"

    @property
    def category(self) -> str:
        return "classical"

    @property
    def status(self) -> str:
        return "active-backend"

    @property
    def description(self) -> str:
        return (
            "Prices European call options by simulating the underlying asset's price path "
            "thousands of times and calculating the average discounted payoff."
        )

    @property
    def supported_problem_types(self) -> list[str]:
        return ["finance.option_pricing"]

    @property
    def required_inputs(self) -> dict:
        return {
            "spot_price": "float",
            "strike": "float",
            "volatility": "float",
            "maturity": "float",
        }

    @property
    def optional_inputs(self) -> dict:
        return {
            "risk_free_rate": "float (default: 0.05)",
            "simulations": "int (default: 10000)",
            "seed": "int (optional)",
        }

    @property
    def output_schema(self) -> dict:
        return {
            "solver": "string",
            "version": "string",
            "num_options": "integer",
            "num_simulations": "integer",
            "expected_price": "float",
            "confidence_interval_95_delta": "float",
        }
    
    @property
    def explainability_notes(self) -> str:
        return (
            "The price is determined by the law of large numbers. The simulation assumes a log-normal distribution "
            "of the asset price (Geometric Brownian Motion). The result is the expected value under a risk-neutral measure."
        )

    @property
    def limitations(self) -> str:
        return "This solver is for European options only and does not account for early exercise. Assumes constant volatility and risk-free rate."

    def run(self, data: list, params: dict) -> dict:
        """
        Executes the Monte Carlo simulation.
        """
        np.random.seed(params.get('seed', None))
        
        simulations = params.get('simulations', 10000)
        risk_free_rate = params.get('risk_free_rate', 0.05)

        all_option_prices = []

        for option in data:
            S = option['spot_price']
            K = option['strike']
            T = option['maturity']
            sigma = option['volatility']
            
            random_draws = np.random.randn(simulations)
            ST = S * np.exp((risk_free_rate - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * random_draws)
            
            payoffs = np.maximum(ST - K, 0)
            option_price = np.mean(payoffs) * np.exp(-risk_free_rate * T)
            all_option_prices.append(option_price)

        average_portfolio_price = np.mean(all_option_prices)
        
        std_dev_prices = np.std(all_option_prices)
        std_error = std_dev_prices / np.sqrt(len(all_option_prices))
        ci_delta = 1.96 * std_error

        result = {
            "summary": {
                "solver": self.id,
                "version": "1.0",
                "num_options": len(data),
                "num_simulations": simulations,
                "expected_price": average_portfolio_price,
                "confidence_interval_95_delta": ci_delta
            }
        }
        
        return result
