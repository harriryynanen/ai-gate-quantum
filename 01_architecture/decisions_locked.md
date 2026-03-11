# Decisions Locked (Do not casually change)

Tämä tiedosto lukitsee keskeiset päätökset.
Jos AI ehdottaa jotain muuta, tämän tiedoston päätökset voittavat, ellei niitä tietoisesti muuteta.

## 1. Identity / Auth
Valittu ratkaisu:
- **Firebase Auth** on käyttäjän identiteetin lähde V1:ssä
- Cloud Run validoi Firebase ID tokenit
- Supabasea käytetään backendin kautta, ei käyttäjän ensisijaisena auth-järjestelmänä

Perustelu:
- frontend on Firebase-painotteinen
- vältetään kaksois-auth (Firebase Auth + Supabase Auth)

## 2. Data ownership
Valittu ratkaisu:
- kaikki datasetit, ajot ja tulokset sidotaan käyttäjään ja sessioniin
- frontend ei kirjoita suoraan solver-dataa tietokantaan
- Cloud Run toimii kontrollipisteenä

## 3. Execution model
Valittu ratkaisu:
- kaikki laskenta kulkee Pythonin kautta
- myös klassinen polku = Python solver
- myös kvanttipolku = Python solver + Qiskit/Aer

## 4. Solver strategy
Valittu ratkaisu:
- käytetään pientä, versionhallittua solver registryä
- ei vapaan koodigeneroinnin analyysimoottoria

## 5. Data preparation strategy
Valittu ratkaisu:
- ensin yleinen profilointi
- sitten solver-kohtainen mapping, puhdistus ja validointi
- ilman validia schemaa ei ajoa

## 6. UI strategy
Valittu ratkaisu:
- workflow UI on yhteinen
- tulosrenderöinti perustuu result schemaan
- ei näyttöä per käyttötapaus
- solver voi lisätä solver-kohtaisen renderer-konfiguraation

## 7. Quantum credibility
Valittu ratkaisu:
- Qiskit-polulla näytetään aidot Qiskit-artefaktit
- ei “quantum-themed” visualisointeja ilman taustadataa

## 8. POC quantum backend
Valittu ratkaisu:
- vain paikallinen simulointi (Qiskit Aer)
- oikea QPU jätetään tulevaan vaiheeseen

## 9. New solver process
Valittu ratkaisu:
- uusi solver lisätään plugin-pakettina
- runner yksin ei riitä
- mukana tulee schema, transforms, validations, result schema ja UI renderer config

## 10. Build strategy
Valittu ratkaisu:
- AI:lle syötetään dokumentaatio vaiheittain
- ei oleteta, että yksi prompti rakentaa koko järjestelmän oikein
