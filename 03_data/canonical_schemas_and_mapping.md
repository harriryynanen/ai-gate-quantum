# Canonical Schemas and Mapping

## Miksi canonical schema
Käyttäjän data voi olla mitä tahansa.
Solver ei saa riippua käyttäjän alkuperäisistä sarakenimistä.

Siksi jokaisella solverilla on oma canonical input schema.

## Esimerkki: mc_option_pricing

Solver tarvitsee canonical-kentät:
- `spot_price`
- `strike`
- `volatility`
- `risk_free_rate`
- `maturity`

Käyttäjän data voi sisältää:
- `S0`
- `K`
- `vol_%`
- `rf`
- `T_years`

Mapping voi olla:

```json
{
  "spot_price": "S0",
  "strike": "K",
  "volatility": "vol_%",
  "risk_free_rate": "rf",
  "maturity": "T_years"
}
```

Transformaatio voi olla:

```json
{
  "volatility": "percent_to_decimal"
}
```

## Mapping strategy

### AI:n rooli
AI saa:
- ehdottaa mappingia
- kertoa confidence-arvion
- pyytää käyttäjältä puuttuvia oletuksia

### Deterministinen kerros
Järjestelmä:
- validoi mappingin
- ajaa transformoinnit
- tuottaa solver-ready datasetin

## Kenttäluokat

### Required fields
Pakolliset kentät; ilman näitä ajoa ei tehdä.

### Optional fields
Valinnaiset lisäkentät.

### Ignored fields
Ei käytetä solverissa.

## Solver-kohtainen UI
Mapping-näkymän pitää olla solver-tietoinen.
Käyttäjä ei mappaa “yleistä dataa”, vaan tietyn solverin vaatimaa schemaa.
