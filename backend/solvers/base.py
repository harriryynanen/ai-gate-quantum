
from abc import ABC, abstractmethod

class BaseSolver(ABC):
    """
    Abstract base class for all solvers. It defines the contract that every
    solver must adhere to, including metadata and the core execution method.
    """

    @property
    @abstractmethod
    def id(self) -> str:
        """Unique identifier for the solver (e.g., 'mc_option_pricing')."""
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable name for the solver (e.g., 'Monte Carlo Option Pricer')."""
        pass

    @property
    @abstractmethod
    def category(self) -> str:
        """Solver category: 'classical', 'hybrid', or 'quantum'."""
        pass

    @property
    @abstractmethod
    def status(self) -> str:
        """
        Development status:
        - 'active-backend': Ready for backend use.
        - 'prototype': In development, not for production.
        - 'reference-only': A non-executable reference implementation.
        """
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        """A brief explanation of what the solver does."""
        pass

    @property
    @abstractmethod
    def supported_problem_types(self) -> list[str]:
        """List of problem domains this solver is suited for (e.g., ['finance.option_pricing'])."""
        pass

    @property
    @abstractmethod
    def required_inputs(self) -> dict:
        """
        Dictionary describing the required data columns or structure.
        Example: {'spot_price': 'float', 'strike': 'float'}
        """
        pass

    @property
    @abstractmethod
    def optional_inputs(self) -> dict:
        """Dictionary describing optional data columns or parameters."""
        pass

    @property
    @abstractmethod
    def output_schema(self) -> dict:
        """
        Dictionary describing the structure of the returned result.
        Example: {'expected_price': 'float', 'confidence_interval': 'float'}
        """
        pass
    
    @property
    def explainability_notes(self) -> str:
        """
        Notes on how the solver's results can be interpreted.
        May include references to models or assumptions.
        """
        return "No specific explainability notes provided."

    @property
    def limitations(self) -> str:
        """Known limitations or constraints of the solver."""
        return "No specific limitations provided."

    @property
    def supports_real_execution(self) -> bool:
        """Indicates if the solver can run on real quantum hardware (QPU)."""
        return False

    def get_metadata(self) -> dict:
        """Returns a dictionary containing all solver metadata."""
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "status": self.status,
            "description": self.description,
            "supported_problem_types": self.supported_problem_types,
            "required_inputs": self.required_inputs,
            "optional_inputs": self.optional_inputs,
            "output_schema": self.output_schema,
            "explainability_notes": self.explainability_notes,
            "limitations": self.limitations,
            "supports_real_execution": self.supports_real_execution,
        }

    @abstractmethod
    def run(self, data: list, params: dict) -> dict:
        """
        The main execution method for the solver.

        Args:
            data (list): The input data, typically a list of dicts.
            params (dict): A dictionary of parameters for the simulation.

        Returns:
            dict: A dictionary containing the results of the computation.
        """
        pass
