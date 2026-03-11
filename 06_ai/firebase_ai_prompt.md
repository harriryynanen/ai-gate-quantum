# Firebase / Gemini Build Prompt (recommended as staged input)

Käytä tätä vain osissa, ei yhtenä massiivisena promptina.

## Stage 1: Architecture understanding
Lue ensin:
- README.md
- 08_state/current_state.yaml
- 01_architecture/decisions_locked.md
- 00_scope/non_goals.md

Tavoite:
- ymmärrä järjestelmän rajaus
- älä keksi uusia pääkomponentteja

## Stage 2: Frontend shell
Lue lisäksi:
- 05_ui/ui_master_spec.md
- 05_ui/ui_result_rendering.md

Toteuta:
- dashboard
- analysis session workspace
- data preparation view
- execution monitor
- results shell
- history

Älä vielä toteuta kaikkia solverikohtaisia detaljeja.

## Stage 3: Data prep flow
Lue lisäksi:
- 03_data/data_intake_and_preparation.md
- 03_data/canonical_schemas_and_mapping.md

Toteuta:
- upload UI
- profiling UI
- mapping UI
- validation summary UI

## Stage 4: Solver integration
Lue lisäksi:
- 04_solvers/solver_registry_v1.md
- 04_solvers/solver_plugin_contract.md
- 04_solvers/result_schema_architecture.md

Toteuta:
- solver registry integration point
- result renderer shells
- solver metadata display

## Stage 5: Quantum credibility UI
Lue lisäksi:
- 07_quality/quantum_credibility_requirements.md

Toteuta:
- circuit panel placeholder
- transpilation summary panel
- execution metadata panel
- counts / estimator result panel

## Important instruction
Jos jokin puuttuu:
- älä keksi omaa tuotemallia
- tee minimaalinen mutta yhteensopiva toteutusrakenne
