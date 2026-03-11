# Solver Plugin Contract

Jokainen uusi solver lisätään plugin-pakettina.
Pelkkä Python-runner ei riitä.

## Pakollinen rakenne

```text
solvers/
  <solver_id>/
    manifest.yaml
    input_schema.json
    mapping_rules.yaml
    validations.py
    transforms.py
    runner.py
    result_schema.json
    ui_renderer.json
    ai_explainer.md
    tests/
```

## Tiedostojen tarkoitus

### `manifest.yaml`
Sisältää:
- solver_id
- version
- title
- category
- type (`classical` / `quantum_simulation`)
- required_fields
- optional_fields
- result_type
- supported_file_types
- limits
- tags

### `input_schema.json`
Canonical input schema.

### `mapping_rules.yaml`
Ehdotetut kenttämapit ja transform-ehdotukset.

### `validations.py`
Validointi ennen ajoa.

### `transforms.py`
Puhdistus ja canonicalisointi.

### `runner.py`
Var sinainen solver-ajologiikka.

Pakollinen rajapinta:
```python
def run_solver(input_data: dict, config: dict) -> dict:
    ...
```

### `result_schema.json`
Määrittää solverin rakenteellisen tulosformaatin.

### `ui_renderer.json`
Kertoo UI:lle mitä tuloskomponentteja käytetään.

### `ai_explainer.md`
Ohje AI-paneelille siitä, miten tämän solverin tuloksia selitetään.

### `tests/`
Solver-kohtaiset testit.

## Vaatimukset uudelle solverille
Uutta solveria ei lisätä registryyn ennen kuin:
- input schema on olemassa
- mapping rules on olemassa
- validations on olemassa
- result schema on olemassa
- renderer config on olemassa
- vähintään yksi onnistunut testidata on olemassa
