# Quantum + AI POC Master Spec

Tämä paketti on **POC-määrittelydokumentti** verkkopalvelulle, joka yhdistää:
- AI-ohjatun analyysikeskustelun
- Python-pohjaisen laskennan
- klassiset solverit
- Qiskit + Aer -simulointiin perustuvan kvanttipolun
- läpinäkyvän käyttöliittymän, jossa näkyvät data, mapping, koodi, lokit ja tulokset

## Tärkein periaate

Järjestelmä **ei** ole vapaan koodigeneroinnin agentti.
Se on **solver-registryyn perustuva analytiikka-alusta**, jossa:

1. käyttäjä keskustelee AI:n kanssa
2. data profiloidaan ja valmistellaan
3. solver valitaan registryssä olevista vaihtoehdoista
4. kaikki laskenta ajetaan Python-koodina
5. kvanttipolku käyttää Qiskit + Aeria
6. tulokset näytetään läpinäkyvästi
7. tulossivulla on aina kontekstisidonnainen AI-paneeli

## Kenelle tämä paketti on tarkoitettu

- sinulle muistiksi ja päätösten lukitsemiseksi
- Firebase/Gemini/Claude/ChatGPT/v0/Figma-tyyppisille AI-työkaluille lähtöaineistoksi
- mahdolliselle kehittäjälle tai tiimille toteutuksen perustaksi

## Miten pakettia käytetään

### Jos ihminen lukee ensimmäistä kertaa
Lue tässä järjestyksessä:
1. `00_scope/product_scope.md`
2. `01_architecture/architecture_overview.md`
3. `04_solvers/solver_registry_v1.md`
4. `03_data/data_intake_and_preparation.md`
5. `05_ui/ui_master_spec.md`
6. `07_quality/quantum_credibility_requirements.md`

### Jos AI-työkalu saa tämän syötteenä
Aloita näistä:
1. `README.md`
2. `08_state/current_state.yaml`
3. `06_ai/ai_handoff_instructions.md`
4. `00_scope/non_goals.md`
5. `01_architecture/decisions_locked.md`
6. `04_solvers/solver_plugin_contract.md`
7. `05_ui/ui_master_spec.md`

## Paketin rakenne

### `00_scope/`
POC:n tavoite, rajaus, ei-tavoitteet ja onnistumisen todennäköisyyden arvio.

### `01_architecture/`
Kokonaisarkkitehtuuri, päätetyt ratkaisut ja kuvat.

### `02_platform/`
Tekniset alustavalinnat: Firebase, Cloud Run, Supabase, autentikointi, virherajat.

### `03_data/`
Data intake, profilointi, mapping, transformaatio, validointi ja hyväksyntä.

### `04_solvers/`
Solver registry, plugin contract, result schema -malli.

### `05_ui/`
Käyttöliittymän master-spec ja tulosnäkymien periaatteet.

### `06_ai/`
AI-roolit, guardrailit, AI-handoff-ohje ja Firebase AI -syöttöohje.

### `07_quality/`
Testistrategia ja kvanttiosuuden uskottavuuskriteerit.

### `08_state/`
Glossary, roadmap ja nykytila koneluettavassa muodossa.

## Kriittiset rajaukset

- Ei vapaan Python- tai Qiskit-koodin generointia tuotantopolussa.
- Ei oikeaa QPU-ajoa POC-vaiheessa.
- Ei yleistä “kaikki analyysit” -alustaa.
- Ei satoja solvereita; vain pieni V1 registry.
- Ei mustaa laatikkoa: data, mapping, koodi ja lokit pitää näyttää käyttäjälle.

## Suositus AI:lle

Älä keksi uusia ydinkomponentteja ilman tarvetta.
Jos jokin asia ei ole määritelty, tarkista ensin:
- `01_architecture/decisions_locked.md`
- `00_scope/non_goals.md`
- `04_solvers/solver_plugin_contract.md`
- `05_ui/ui_master_spec.md`

Jos ristiriitaa syntyy, nämä tiedostot ohittavat muut yleiset tulkinnat.
