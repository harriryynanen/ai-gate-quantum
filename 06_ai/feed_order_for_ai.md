# Feed Order for AI Tools

## Suositeltu tapa
Älä syötä koko pakettia yhdellä kertaa, jos työkalu on altis “over-designille”.

## Paras järjestys

### 1. Scope + guardrails
- README.md
- 00_scope/product_scope.md
- 00_scope/non_goals.md
- 01_architecture/decisions_locked.md

### 2. Architecture
- 01_architecture/architecture_overview.md
- 02_platform/deployment_stack.md
- 02_platform/authentication_and_data_ownership.md

### 3. Data
- 03_data/data_intake_and_preparation.md
- 03_data/canonical_schemas_and_mapping.md

### 4. Solvers
- 04_solvers/solver_registry_v1.md
- 04_solvers/solver_plugin_contract.md
- 04_solvers/result_schema_architecture.md

### 5. UI
- 05_ui/ui_master_spec.md
- 05_ui/ui_result_rendering.md

### 6. Quality / quantum
- 07_quality/testing_strategy.md
- 07_quality/quantum_credibility_requirements.md

## Miksi näin
Tällä järjestyksellä AI:
- ymmärtää ensin rajaukset
- ei rakenna liian spesifiä UI:ta
- ei lisää vapaata code-agent -mallia
