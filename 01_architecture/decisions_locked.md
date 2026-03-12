# Decisions Locked (Do not casually change)

Tämä tiedosto lukitsee nykyiset ydinkäytännöt.
Jos AI ehdottaa jotain muuta, tämän tiedoston päätökset voittavat, ellei niitä tietoisesti muuteta.

## 1. Product identity
Valittu ratkaisu:
- **QuantumFlow on quantum-first, AI-guided workflow tool**
- klassinen polku on mukana vertailuna ja fallbackina
- tuote ei saa ajautua geneeriseksi AI dashboardiksi

Perustelu:
- projektin ydin on kvanttilaskennan ymmärtäminen ja läpinäkyvä päätöksenteko
- käyttöliittymä ja recommendation logic on rakennettava tämän identiteetin ympärille

## 2. Workflow model
Valittu ratkaisu:
- käyttö on **session-first**
- AI Chat / Define Goal käynnistää session
- muut näkymät ovat saman session vaiheita
- workflow-vaiheet ovat:
  - Define Goal
  - Prepare Data
  - Select Method
  - Configure Job
  - Execute
  - Review Results

Perustelu:
- käyttäjän ei pidä arpoa irrallisten sivujen välillä
- session toimii tuotteen selkärankana

## 3. Backend direction
Valittu ratkaisu:
- aktiivinen toteutuspolku on **Firebase-native**
- ensisijaiset komponentit:
  - Firebase Hosting / Firebase Studio
  - Firestore
  - Firebase Functions v2
  - Firebase Auth readiness tarvittaessa
- **Supabase ei ole aktiivinen toteutuspolku**
- **App Script ei ole aktiivinen toteutuspolku**

Perustelu:
- yksi yhtenäinen stack vähentää kitkaa
- nykykehitys on jo siirtynyt käytännössä Firebase-haaraan

## 4. Development model
Valittu ratkaisu:
- normaali kehitys ei saa vaatia paikallista Python-runtimea, venviä tai pakollista lokaalibackendiä
- mock mode saa edelleen olla hyödyllinen kehityksessä
- mutta mock ei saa jäädä pysyväksi tuotteen totuudeksi

Perustelu:
- halutaan nopea iterointi ilman ympäristörituaaleja
- backend otetaan mukaan hallitusti, ei paikallisen Python-stackin varaan

## 5. Recommendation strategy
Valittu ratkaisu:
- recommendation/comparison contract on tuotteen ydin
- AI:n tai backendin on palautettava strukturoitu suositusobjekti
- suosituksen pitää sisältää ainakin:
  - recommendedPath
  - alternativePath
  - confidence
  - reasoningSummary
  - tradeoffs
  - assumptions
  - blockers
  - requiredInputs
  - explorationVsProduction
- recommendation logic **ei saa aina suosia kvanttia**

Perustelu:
- quantum-first identiteetti ei saa tarkoittaa quantum-biased suosituslogiikkaa
- uskottavuus syntyy siitä, että klassinenkin voidaan suositella, jos se on perustellumpi

## 6. Solver choice UX
Valittu ratkaisu:
- käyttäjän ei pitäisi pääpolussa valita solveria suoraan
- AI/backend suosittelee polun ja menetelmän
- käyttäjä hyväksyy, tarkistaa perustelut tai overrideaa advanced-polussa

Perustelu:
- tavoitteena on AI-guided workflow, ei solver picker -tuote

## 7. Transparency rules
Valittu ratkaisu:
- UI:n pitää näyttää:
  - missä workflow-vaiheessa ollaan
  - miksi tämä vaihe on tärkeä
  - mikä on suositeltu seuraava askel
  - mikä polku on suositeltu ja miksi
  - mitkä oletukset, blockerit ja tradeoffit vaikuttavat valintaan
  - mitä execution-vaiheessa tapahtuu
  - miten tuloksia pitää tulkita

Perustelu:
- ei mustaa laatikkoa
- AI:n arvo on ohjata ja selittää, ei vain tuottaa vastaus

## 8. AI integration order
Valittu ratkaisu:
- **Genkit/Gemini ei tule takaisin ennen kuin Functions-backendin deploy-polku on vakaa**
- nykyvaiheessa recommendation voi olla deterministinen server-side heuristic
- AI integroidaan takaisin vasta puhtaan backend-rungon päälle

Perustelu:
- nykyiset ongelmat osoittivat, että AI SDK ei saa rikkoa perusbackendiä
- ensin vakaa deploy, sitten AI

## 9. Functions policy
Valittu ratkaisu:
- käytetään yhtä yhtenäistä mallia: **Firebase Functions v2**
- runtime lukitaan Node 20:een
- request-data luetaan muodosta `request.data`
- auth luetaan muodosta `request.auth`
- v1/v2-syntaksin sekoittaminen on kielletty

Perustelu:
- tähän asti suurin tekninen ongelma on ollut syntaksien ja integraatioiden sekoittuminen

## 10. Cost policy for current POC
Valittu ratkaisu:
- tavoite on pitää POC-kulut hyvin pieninä
- mutta jos oikea Functions-deploy vaatii Blaze-planin, se hyväksytään hallitusti
- budjettihälytys otetaan käyttöön heti

Perustelu:
- Spark-plan ei riitä oikeaan Functions-deployhin
- pieni hallittu Blaze-käyttö on parempi kuin pysyvä jumitus mock-tilassa

## 11. Compute strategy for now
Valittu ratkaisu:
- tässä vaiheessa ei rakenneta raskasta compute-stackia
- ei paikallista Python-ajopolkua oletukseksi
- ei vielä Cloud Run compute -haaraa aktiiviseksi oletuspoluksi
- execution lifecycle voi olla aluksi backend-driven mutta kevyt

Perustelu:
- recommendation + session + execution contract pitää lukita ennen raskasta laskentaa

## 12. Documentation discipline
Valittu ratkaisu:
- `08_state/current_state.yaml` ja tämä tiedosto ovat ensisijainen totuus aktiivisesta suunnasta
- vanhempi Cloud Run + Supabase + Python -suunta katsotaan arkistoiduksi ajatteluksi, ei aktiiviseksi toteutusohjeeksi

Perustelu:
- repo ei saa puhua kahdella eri arkkitehtuurikielellä samaan aikaan
- sekä ihmiset että AI tekevät muuten vääriä päätelmiä
