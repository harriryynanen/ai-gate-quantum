# Data Intake and Preparation

## Perusperiaate

Dataa ei saa viedä solverille suoraan uploadin jälkeen.

Pakollinen putki on:

1. Raw upload
2. Automated profiling
3. Data quality checks
4. Solver-specific mapping
5. Transformations / cleaning
6. Final validation
7. User approval
8. Execution

## Vaihe 1: Raw upload
Tallennetaan alkuperäinen tiedosto sellaisenaan.

Tallennettavat metatiedot:
- filename
- format
- size
- uploaded_by
- uploaded_at
- session_id

## Vaihe 2: Automated profiling
Järjestelmä tunnistaa:
- sarakkeet
- datatyypit
- puuttuvat arvot
- uniikit arvot
- min/max
- esimerkkirivejä
- mahdolliset päivämäärät
- mahdolliset prosentti-/valuutta-formaatit

## Vaihe 3: Data quality checks
Järjestelmä tuottaa:
- errors
- warnings
- suggestions

Esimerkkejä:
- puuttuva pakollinen kenttä
- prosentti tekstinä
- duplikaatit
- epäselvä yksikkö
- liian vähän rivejä

## Vaihe 4: Solver-specific mapping
Kun solver on valittu, data mapataan solverin canonical schemaan.

## Vaihe 5: Transformations
Sallitut V1-muunnokset:
- rename column
- string -> float
- percent -> decimal
- currency string -> number
- parse date
- drop duplicates
- drop null rows
- fill missing with constant
- filter unused columns

## Vaihe 6: Final validation
Tarkistetaan, että solver-ready dataset täyttää solverin vaatimukset.

## Vaihe 7: User approval
Käyttäjä näkee:
- mihin kenttiin mapping tehtiin
- mitä muunnoksia tehtiin
- mitä oletuksia lisättiin
- mitä sarakkeita ignoroitiin

## Ei validia schemaa = ei ajoa
Tämä on järjestelmän ydinsääntö.
