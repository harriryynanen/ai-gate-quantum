
# Solver Architecture

This document explains why solver definitions are constrained, how AI recommendations map to the solver registry, and what is currently active runtime path vs. placeholder/reference code.

## Constrained Solver Definitions

The solver definitions are constrained to ensure that the system is not a black box. By using a predefined registry of solvers, we can ensure that all recommendations are transparent and inspectable. This approach prevents the AI from inventing arbitrary solver code, which could be a security risk and would make it difficult to validate the results.

Each solver in the registry has a detailed contract that includes its category, maturity, strengths, weaknesses, and other attributes. This allows the user to understand the trade-offs of each solver and make an informed decision.

## Recommendation-to-Solver Mapping

The AI-guided recommendation system maps the user's goal to a specific solver in the registry. This mapping is based on a set of rules that take into account the user's goal, the problem type, and the maturity of the solvers. The mapping logic is designed to be transparent and auditable, so that the user can understand why a particular solver was recommended.

## Active Runtime Path vs. Placeholder/Reference Code

The active runtime path for this application is through Firebase Functions. When a user submits a job, the request is sent to a Cloud Function that handles the execution. The Cloud Function then returns the results to the user.

The Python files in `04_solvers/reference_code/python/` are placeholder/reference code and are not part of the active runtime path. These files are intended to be a reference for future development, and they are not executed by the application. This separation of concerns ensures that the application is secure and that the runtime environment is well-defined.
