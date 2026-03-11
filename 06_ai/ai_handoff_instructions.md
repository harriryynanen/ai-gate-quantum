# AI Handoff Instructions

Tämä tiedosto on tarkoitettu annettavaksi toiselle AI:lle.

## Project summary
Rakennetaan POC-verkkopalvelu, jossa:
- käyttäjä keskustelee AI:n kanssa
- lataa datan
- data profiloidaan ja mapataan solveriin
- kaikki laskenta tehdään Pythonissa
- solverit tulevat pienestä registryistä
- kvanttipolku käyttää Qiskit + Aeria
- tulokset näkyvät läpinäkyvästi
- tulossivulla on aina run-scoped AI-paneeli

## Mandatory architectural choices
- Firebase Hosting frontendille
- Firebase Auth identiteetin lähteenä
- Cloud Run Python-ajolle
- Cloud Tasks jobeille
- Supabase Postgres + Storage
- ei vapaan koodigeneroinnin tuotantopolkua
- ei oikeaa QPU-ajoa V1:ssä

## Mandatory UI choices
- workflow UI kaikille yhteinen
- tulosten renderöinti result schema -tyypin mukaan
- ei näyttöä per käyttötapaus
- tulossivulla AI-paneeli aina näkyvissä

## Mandatory data choices
- raw upload säilytetään
- ensin yleinen profilointi
- sitten solver-kohtainen mapping
- ilman validia schemaa ei ajoa

## What not to invent
Älä lisää ilman selkeää syytä:
- toista auth-järjestelmää
- vapaata code agent -mallia
- suoraa client -> database domain write -mallia
- real QPU execution path V1:een
- näyttöjä jokaiselle liiketoimintatapaukselle erikseen

## Where to look next
1. `01_architecture/decisions_locked.md`
2. `04_solvers/solver_plugin_contract.md`
3. `03_data/data_intake_and_preparation.md`
4. `05_ui/ui_master_spec.md`
5. `07_quality/quantum_credibility_requirements.md`
