# AI-Gated Solver Routing (POC)

A proof-of-concept for routing analytical problems to the most suitable execution path — classical, hybrid, or quantum-simulated — using AI-assisted problem profiling and a controlled solver registry.

## Status

This repository is an early-stage prototype.

- The core idea and architecture are defined
- Parts of the implementation are still incomplete or experimental
- The current quantum path is based on **Qiskit + Aer simulation**, not real QPU execution
- This is **not production-ready software**
- The repo should be read as a transparent experiment in solver routing and orchestration

## Why this project exists

A common intuition is that AI could simply generate the computation needed for a problem on demand.

In practice, that approach becomes fragile very quickly:
- solver logic may be inconsistent
- execution paths are hard to validate
- reproducibility suffers
- “quantum” claims become easy to overstate

This project explores a different approach:

1. AI helps interpret and profile the problem
2. the system maps the problem to a constrained set of registered solver paths
3. execution happens through explicit and auditable solver logic
4. results are presented with traceability rather than as a black box

## Core hypothesis

For analytical workflows, AI is more useful as a **problem-profiling and routing layer** than as a free-form generator of solver logic.

In other words:
- AI can help decide **which type of solver should be considered**
- the actual execution should come from a **controlled solver registry**
- every result should remain inspectable

## Current scope

This POC currently focuses on:

- AI-assisted problem interpretation
- registry-based solver selection
- Python-based execution for registered solver paths
- a quantum-simulated path via Qiskit + Aer
- transparent output principles:
  - input context
  - mapping / interpretation
  - selected solver path
  - code and execution trace
  - logs and result objects

## What this is not

This repository is **not**:

- a “solve anything” platform
- unrestricted AI code generation in the execution path
- evidence that quantum is generally better than classical methods
- real quantum hardware execution in the current phase
- a polished end-user application

## Design principles

### 1. Controlled solver selection
AI may assist with interpretation, but execution must go through explicit registered solver paths.

### 2. Classical baseline matters
The goal is not to force a quantum path. Classical methods should remain first-class and comparable.

### 3. Transparency over magic
The system should expose how a problem was interpreted, which solver path was selected, and what was executed.

### 4. Credibility over hype
If a workflow claims to use a quantum path, the supporting artifacts should make that claim inspectable.

### 5. Narrow scope first
The project is intentionally constrained. A small credible prototype is more valuable than a broad but vague platform concept.

## Repository guide

If you want to understand the project, start here:

1. `00_scope/product_scope.md`
2. `01_architecture/architecture_overview.md`
3. `04_solvers/solver_registry_v1.md`
4. `04_solvers/solver_plugin_contract.md`
5. `05_ui/ui_master_spec.md`
6. `07_quality/quantum_credibility_requirements.md`

## Repository structure

- `00_scope/` – project scope, goals, and non-goals
- `01_architecture/` – architecture overview and locked decisions
- `02_platform/` – platform and infrastructure choices
- `03_data/` – data intake, profiling, mapping, validation
- `04_solvers/` – solver registry and execution contracts
- `05_ui/` – UI and result-view principles
- `06_ai/` – AI roles, constraints, and handoff instructions
- `07_quality/` – testing and credibility requirements
- `08_state/` – current state, roadmap, glossary

## Current limitations

At this stage, the main limitations are:

- implementation is incomplete
- solver coverage is intentionally narrow
- quantum execution is simulation-based
- evaluation logic still needs stronger benchmarking against classical baselines
- the project is better understood as an architectural and experimental prototype than as a finished application

## Near-term goals

The next milestones are:

- implement one narrow end-to-end example that actually runs
- make solver eligibility rules explicit
- compare candidate solver paths against a classical baseline
- improve result traceability in the UI
- tighten the distinction between classical, hybrid, and quantum-simulated paths

## Notes for collaborators

This repo is meant to support disciplined experimentation.

Please do not expand the concept into a broad autonomous agent system without preserving the core constraints:
- controlled solver registry
- explicit execution paths
- transparent outputs
- narrow, testable scope

## Notes for AI tools

If an AI tool is used to assist development, it should respect the project’s constraints rather than inventing new core behavior.

Priority references:
- `01_architecture/decisions_locked.md`
- `00_scope/non_goals.md`
- `04_solvers/solver_plugin_contract.md`
- `05_ui/ui_master_spec.md`

If there is a conflict, these files override broader interpretation.
