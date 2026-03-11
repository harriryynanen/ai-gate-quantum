# UI Master Spec

## Yleinen suunnitteluperiaate

UI ei saa olla musta laatikko.
Käyttäjän pitää pystyä näkemään:
- mitä dataa käytetään
- mikä solver valittiin
- miten data mapattiin
- mitä koodia ajettiin
- missä vaiheessa jobi on
- mitä tulokset tarkoittavat

## Pääruudut

### 1. Dashboard
Sisältö:
- recent jobs
- status summary
- new analysis button
- datasets overview

### 2. Analysis Session Workspace
Rakenne:
- vasen: sessionit / history
- keskellä: AI-keskustelu + ohjattu työtila
- oikea paneeli: context / plan / later result assistant

Vaiheittainen käyttö:
1. problem chat
2. data upload
3. profile review
4. solver proposal
5. mapping review
6. run confirmation

### 3. Data Preparation View
Paneelit:
- dataset preview
- profile & quality report
- mapping editor
- AI suggestions
- solver requirements

### 4. Job Execution Monitor
Sisältö:
- status timeline
- live logs
- execution metadata
- code snapshot summary
- elapsed time

### 5. Results View
Sisältö:
- summary card
- solver-specific result components
- code / math / metadata tabs
- AI result panel (aina näkyvissä)

### 6. Job History
Sisältö:
- job list
- solver type
- runtime
- status
- dataset
- timestamp

## Tulossivun tärkeä vaatimus
Tulossivulla on aina:
- solver name + version
- result type
- input snapshot summary
- code snapshot
- AI chat / assistant panel

## AI-paneeli tulossivulla
Paneeli on **run-scoped**.
Se saa kontekstiksi:
- tämän jobin inputit
- solverin
- code snapshotin
- logs
- result jsonin

Esimerkkikysymyksiä:
- miksi tämä solver valittiin
- mitä tämä metriikka tarkoittaa
- mikä tässä on kvanttiosan rooli
- miten tulos muuttuisi toisella parametrilla

## Visual design
Suositus:
- modern technical dashboard
- dark mode friendly
- card-based
- selkeät statusvärit
- koodikomponentit
- observability-tyylinen käyttöliittymä

## Ei suositella
- näyttöä per yksittäinen analyysikäyttötapaus
- liian spesifejä Sharpe-/VaR-/option-pricing -näkymiä, jos ne eivät perustu result schemaan
