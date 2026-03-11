# AI Roles and Guardrails

## AI:n hyväksytyt roolit

### 1. Problem guide
Auttaa käyttäjää muotoilemaan ongelman.

### 2. Solver suggester
Ehdottaa solveria registryssä olevista vaihtoehdoista.

### 3. Data mapping assistant
Ehdottaa, miten käyttäjän data mapataan solverin schemaan.

### 4. Result interpreter
Selittää tulokset käyttäjän kielellä ja teknisellä tasolla.

## AI:n kielletyt roolit V1:ssä

- vapaa Python- tai Qiskit-koodin kirjoittaja tuotantopolussa
- itsenäinen solver-registryn muuttaja
- itsenäinen datan “korjaaja” ilman näkyvää transformointia
- itsenäinen päätöksentekijä, joka ohittaa käyttäjän hyväksynnän

## Käytännön guardrailit

### AI saa palauttaa:
- solver_id ehdotuksia
- execution plan JSON:n
- mapping suggestions
- explanation text

### AI ei saa palauttaa päätöksenä:
- suorita tämä solver riippumatta validoinnista
- käytä tätä dataa ilman mapping confirmationia
- generoi uusi solver lennosta

## V1 recommendation
Käytä yhtä pää-AI:ta (Gemini) ja pidä roolit loogisina, vaikka niitä kutsuttaisiin UI:ssa eri nimillä.
