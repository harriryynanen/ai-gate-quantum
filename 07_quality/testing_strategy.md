# Testing Strategy

## Tavoite
POC ei tarvitse raskasta enterprise-QA:ta, mutta tarvitsee riittävän testitason, jotta järjestelmää voi pitää uskottavana.

## Testitasot

### 1. Unit tests
Kohteet:
- solver runnerit
- validations
- transforms
- result schema serialization

### 2. Contract tests
Kohteet:
- jokainen solver plugin
- input schema vs runner
- result schema vs renderer expectations

### 3. Integration tests
Kohteet:
- upload -> profile -> mapping -> validation -> run -> result
- yksi onnistunut polku per V1 solver

### 4. UI smoke tests
Kohteet:
- dashboard opens
- session creation works
- data prep loads
- result page renders expected component shell

### 5. Failure tests
Kohteet:
- puuttuva pakollinen kenttä
- mapping epäonnistuu
- solver execution fail
- infra timeout

## V1 minimum test pack
- 1 unit test per solver runner
- 1 contract test per solver
- 1 integration test per solver
- 1 UI smoke test per pääruutu
- 1 failure test per virheluokka

## Golden outputs
Suositus:
- käytä golden JSON outputeja solveille, joiden tulosformaatti pitää lukita
