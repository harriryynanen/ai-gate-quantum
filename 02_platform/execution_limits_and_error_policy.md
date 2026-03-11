# Execution Limits and Error Policy

## Sallitut tiedostomuodot V1
- CSV
- JSON

## Ei vielä V1:ssä
- XLSX oletuksena pois päältä
- PDF ei ole solver-input-dataa varten
- kuvamuotoinen data ei kuulu V1:een

## Datarajat (suositus POC:lle)
- max upload size: **20 MB**
- max preview rows UI:ssa: **1 000**
- max processed rows solverille: **250 000**
- max columns: **200**
- jos rajat ylittyvät, käyttäjälle näytetään ohje rajata data pienemmäksi

## Suoritusrajat
- max runtime per job: **10 min**
- max auto retry: **1**
- retry vain infrastruktuuri-/verkko-/tilapäisille virheille
- ei retryä schema-/validation-virheille

## Virheluokat

### 1. Validation error
Esim. puuttuva pakollinen kenttä.
Toimenpide:
- jobia ei käynnistetä
- käyttäjälle näytetään tarkka korjausehdotus

### 2. Mapping error
Esim. solverin vaatimaa kenttää ei voitu mapata.
Toimenpide:
- pyydetään manuaalinen valinta

### 3. Execution error
Esim. solver runner kaatuu.
Toimenpide:
- tallennetaan lokit
- näytetään virheen luokka ja viesti
- tarjotaan mahdollisuus avata code snapshot ja logs

### 4. Infrastructure error
Esim. Cloud Run / queue / storage -häiriö.
Toimenpide:
- 1 automaattinen retry
- sen jälkeen failed

## Siemenet ja toistettavuus
Kaikissa stochastisissa solveissa pyritään käyttämään:
- kirjattua random seed -arvoa
- solver version -tunnistetta
- input hash -tunnistetta

Tämä on tärkeää audit trailin kannalta.
