# UI Result Rendering

## Malli
UI = workflow shell + result renderer + AI panel

## Workflow shell
Sama kaikille solveille:
- session header
- dataset context
- solver context
- status
- tabs / panels

## Result renderer
Renderöi solverin `result_type`-määrittelyn mukaan.

## V1 komponenttityypit

### Common
- summary metrics card
- tables
- charts
- code viewer
- logs viewer
- AI interpretation card

### Distribution result
- histogram
- percentile table
- expected value card
- risk summary text

### Quantum result
- circuit viewer
- transpilation summary
- backend metadata
- counts / estimator section
- quantum interpretation text

## Solver-kohtainen laajennus
UI saa lukea solverin `ui_renderer.json`-tiedoston.

Esimerkki:
```json
{
  "layout": "standard_results",
  "components": [
    "summary_metrics",
    "circuit_viewer",
    "transpilation_summary",
    "counts_histogram",
    "ai_interpretation"
  ]
}
```
