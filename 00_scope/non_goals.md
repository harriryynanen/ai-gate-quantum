# Non-goals / Rajaukset

## Rajaukset, jotka ovat tarkoituksellisia

### 1. Ei vapaan koodigeneroinnin tuotantopolku
Tuotantopolussa AI ei saa kirjoittaa vapaata Python- tai Qiskit-koodia ja ajaa sitä suoraan.
Sallittu malli on:
- AI tulkitsee ongelmaa
- järjestelmä valitsee solver registryssä olevan solverin
- Python-koodi muodostuu valmiista solver-templatesta

### 2. Ei oikeaa QPU-ajoa V1:ssä
Kvanttipolku käyttää vain:
- Qiskit
- AerSimulator
- mahdollisesti fake backend / noise model -tasoa

### 3. Ei satoja solvereita
V1:n tavoite on pieni registry, ei laaja finanssikirjasto.

### 4. Ei suoraa client -> database kirjoitusta V1:ssä
Frontend ei kirjoita suoraan tuotantodataan, paitsi tarkkaan rajatut auth/telemetry-tapaukset.
Sovelluslogiikka kulkee Cloud Run -API:n kautta.

### 5. Ei geneeristä tulossivua kaikelle
Tulokset renderöidään:
- yhteisillä result component typeillä
- solver-kohtaisella result schema -määrittelyllä

### 6. Ei oletusta, että kvanttisolvers on “parempi”
POC ei yritä todistaa kvanttihyötyä.
POC näyttää:
- miten ongelma mallinnetaan
- miten kvanttisimulointi ajetaan
- miten tulokset tehdään näkyviksi

### 7. Ei automaattista datan “arvailua”
AI saa ehdottaa mappingia, mutta:
- validointi on sääntöpohjainen
- käyttäjä hyväksyy mappingin
- ilman validia schemaa ajoa ei käynnistetä

## Kielletyt kehityspolut V1:ssä

- monimutkainen multi-agent-verkko, jossa useat AI:t “neuvottelevat”
- reaaliaikainen markkinadatan integraatio
- suora kaupankäynti tai päätöksenteko
- itseään muokkaava solver registry
- “quantum look and feel” ilman aitoa Qiskit-dataa
