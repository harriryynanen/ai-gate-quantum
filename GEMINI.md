# Project Instructions

This project is a POC web application for transparent AI-assisted analytics and quantum simulation.

## Non-negotiable architecture
- Frontend: Firebase Hosting web app
- Auth: Firebase Auth
- Python execution: Google Cloud Run
- Database + file metadata + logs: Supabase Postgres + Storage
- AI guide: Gemini
- All computation must run through Python
- Quantum in V1 is simulation only using Qiskit + Aer
- No free-form AI-generated solver code in production flow
- Use solver registry and solver templates only

## UX principles
- The system must not be a black box
- UI must show execution stages, selected solver, code snapshot, logs, results, and AI interpretation
- Result pages must always include contextual AI chat tied to the current run

## Data principles
- Data flow must be: upload -> profiling -> mapping -> validation -> approval -> execution
- Data preparation must be solver-aware after solver selection
- No valid schema, no execution

## Scope limits for V1
- Do not add broad feature sets
- Do not add real QPU execution
- Do not redesign architecture
- Start with UI shell and workflow screens only

## Read these files first
- README.md
- docs/product-scope.md
- docs/architecture.md
- docs/ui-spec.md
- docs/data-preparation.md
- docs/solver-plugin-contract.md
- project_state/current_state.yaml

## First implementation goal
Build the frontend shell and main workflow screens:
1. Dashboard
2. AI Chat Workspace
3. Data Preparation
4. Job Configuration
5. Execution Monitor
6. Result Page with contextual AI side panel
7. Job History

Do not implement all backend logic first. Start with UI structure, navigation, placeholder states, and typed interfaces.