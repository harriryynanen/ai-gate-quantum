# Risks and Success Probability

## Arvio onnistumistodennäköisyydestä

### Tekninen demoversio
**85 %**
- Firebase Hosting + Cloud Run + Supabase + Gemini on realistinen pino
- Python- ja Qiskit-ajot ovat toteutettavissa Cloud Runissa

### Käyttökelpoinen POC
**70 %**
- onnistuu, jos scope pysyy pienenä
- epäonnistuu helposti, jos yritetään tukea liian monia analyysityyppejä heti

### Ensimmäisellä yrityksellä “viimeistellyn tuntuinen” tuote
**45 %**
- ensimmäinen versio on todennäköisesti karkea
- käyttöliittymää ja data-mappingia pitää lähes varmasti iteroda

## Suurimmat riskit

1. **Scope creep**
   - solvereita ja poikkeuksia tulee liikaa

2. **Datan heterogeenisuus**
   - käyttäjän data ei vastaa solverin schemaa

3. **UI:n yliyksityiskohtaisuus**
   - jos näyttöjä rakennetaan per käyttötapaus, UI räjähtää

4. **AI:n ylivapaus**
   - jos AI saa tehdä liikaa oletuksia tai generoida vapaata koodia

5. **Kvanttipolun epäuskottavuus**
   - jos UI ei näytä oikeita Qiskit-artefakteja

## Riskien hallintakeinot

- pidetään V1-solverit pienenä
- lukitaan plugin contract
- näytetään datan mapping näkyvästi
- tehdään result schema -pohjainen UI
- tallennetaan koodisnapshot, lokit ja tulosjson jokaiselle ajolle
