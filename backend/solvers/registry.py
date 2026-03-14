
import os
import importlib
import inspect
from typing import Dict, List, Type
from backend.solvers.base import BaseSolver

class SolverRegistry:
    """
    A registry to discover, load, and manage all available solvers.
    It dynamically imports solver modules from subdirectories.
    """
    def __init__(self):
        self._solvers: Dict[str, BaseSolver] = {}
        self._metadata: Dict[str, dict] = {}
        self.discover_solvers()

    def discover_solvers(self):
        """
        Dynamically discovers and registers solvers from the 'solvers' directory.
        Solvers are expected to be in subdirectories like 'classical', 'quantum', etc.
        """
        solvers_dir = os.path.dirname(__file__)
        
        for category in os.listdir(solvers_dir):
            category_path = os.path.join(solvers_dir, category)
            if os.path.isdir(category_path) and not category.startswith('__'):
                for filename in os.listdir(category_path):
                    if filename.endswith('.py') and not filename.startswith('__'):
                        module_name = f"backend.solvers.{category}.{filename[:-3]}"
                        try:
                            module = importlib.import_module(module_name)
                            for name, obj in inspect.getmembers(module):
                                if inspect.isclass(obj) and issubclass(obj, BaseSolver) and obj is not BaseSolver:
                                    solver_instance = obj()
                                    if solver_instance.id in self._solvers:
                                        print(f"Warning: Duplicate solver ID '{solver_instance.id}' found. Overwriting.")
                                    self._solvers[solver_instance.id] = solver_instance
                                    self._metadata[solver_instance.id] = solver_instance.get_metadata()
                        except ImportError as e:
                            print(f"Error importing solver module {module_name}: {e}")

    def get_solver(self, solver_id: str) -> BaseSolver:
        """
        Retrieves an initialized solver instance by its ID.

        Args:
            solver_id: The unique ID of the solver.

        Returns:
            An instance of the solver, or None if not found.
        """
        return self._solvers.get(solver_id)

    def list_solvers(self) -> List[dict]:
        """
        Returns a list of metadata for all registered solvers.
        """
        return list(self._metadata.values())

    def get_metadata(self, solver_id: str) -> dict:
        """
        Retrieves the metadata for a specific solver by its ID.
        """
        return self._metadata.get(solver_id)

# Create a global instance of the registry to be used by the app
registry = SolverRegistry()
