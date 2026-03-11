# Result Schema Architecture

## Miksi result schema
UI ei saa perustua yksittäisiin liiketoimintatapauksiin.
UI:n tulee renderöidä tulokset solverin ilmoittaman result typen mukaan.

## V1 result types

### 1. `distribution_result`
Käytetään:
- Monte Carlo option pricing
- credit risk
- insurance loss

Tyypilliset elementit:
- summary metrics
- histogram
- percentiles
- optional CDF
- textual AI interpretation

### 2. `table_result`
Käytetään:
- rankingit
- simple tabular outputs

### 3. `time_series_result`
Varataan myöhempään vaiheeseen.

### 4. `quantum_sampling_result`
Käytetään kvanttipoluissa, joissa keskeinen data on counts / sampling.

### 5. `quantum_estimation_result`
Käytetään kvanttipoluissa, joissa näytetään:
- estimate
- circuit
- transpilation metadata
- execution metadata

## UI-renderöinnin logiikka
UI käyttää:
- `result_type`
- `ui_renderer.json`
- `result_schema.json`

Esimerkki:
```json
{
  "result_type": "distribution_result",
  "components": [
    "summary_metrics",
    "histogram",
    "percentiles_table",
    "ai_interpretation"
  ]
}
```

## Tärkeä sääntö
Tulossivu ei ole “näkymä per use case”.
Se on:
- yhteinen workflow shell
- solverin result schemaan perustuva renderer
