# Product Scope (POC)

## Ydinidea

Rakennetaan verkkopalvelu, jossa käyttäjä voi:
1. keskustella AI:n kanssa analyysitarpeesta
2. ladata datan
3. nähdä datan profiloinnin ja mappingin
4. valita tai hyväksyä solverin
5. käynnistää Python-pohjaisen laskennan
6. nähdä ajon tila, koodi, lokit ja tulokset
7. kysyä tuloksista AI:ltä ajon jälkeen

## Mikä tämä POC on

Tämä POC on:
- **AI + solver orchestration** -demo
- näkyvä ja opetuksellinen analytiikkatyökalu
- klassisen ja kvanttisimuloinnin yhdistävä järjestelmä
- rajattu, dokumentoitu ja auditoitava

## Mikä tämä POC ei ole

Tämä POC ei ole:
- täysin yleinen analytiikkamoottori
- vapaa agentti, joka kirjoittaa mitä tahansa Pythonia
- oikean kvanttikoneen tuotantoajojärjestelmä
- low-code-automaatiodemo ilman matematiikkaa
- täydellinen enterprise-tuote

## Tärkeimmät käyttötapaukset (V1)

1. **Trading / option pricing**
   - klassinen Monte Carlo
   - kvanttisimulaatiodemo Qiskitillä

2. **Banking / credit risk**
   - odotettu tappio, yksinkertainen riskisimulaatio

3. **Insurance / loss simulation**
   - yksinkertainen Monte Carlo -pohjainen tappiosimulaatio

## Käyttäjälle näkyvät vaiheet

1. Problem definition
2. Data upload
3. Data profiling
4. Solver selection
5. Mapping & validation
6. Run configuration
7. Execution monitor
8. Results + AI interpretation

## Menestyskriteerit POC:lle

POC on onnistunut, jos:
- käyttäjä ymmärtää, mitä tapahtui
- dataa ei käytetä “mystisesti”
- solverit toimivat toistettavasti
- kvanttiosuus näyttää oikeita Qiskit-artefakteja
- uusi AI voi lukea dokumentaation ja jatkaa toteutusta ilman tätä keskustelua
