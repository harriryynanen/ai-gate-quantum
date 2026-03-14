
# Arkkitehtuuri

Tämä dokumentti kuvaa AI-Gate Quantum POC -sovelluksen arkkitehtuurin ja perustelee tehdyt teknologiabalinnat.

## Yleiskuva

Sovellus on suunniteltu Google Cloud -ekosysteemin päälle hyödyntäen palvelimettomia (serverless) komponentteja kustannustehokkuuden ja helpon skaalautuvuuden varmistamiseksi.

- **Frontend:** [Firebase Hosting](https://firebase.google.com/docs/hosting)
  - Valittu sen helppokäyttöisyyden, globaalin CDN:n ja automaattisen SSL-sertifikaatin vuoksi. Integroituu saumattomasti muihin Firebase-palveluihin.
- **Backend (Python-ajot):** [Google Cloud Run](https://cloud.google.com/run)
  - Palvelimeton alusta Python-sovellusten ajamiseen. Skaalautuu automaattisesti nollaan, mikä tarkoittaa, että kustannuksia syntyy vain käytön mukaan. Tämä on POC-vaiheessa elintärkeää.
- **Tietokanta & Tiedostojen tallennus:** [Firestore](https://firebase.google.com/docs/firestore) & [Cloud Storage for Firebase](https://firebase.google.com/docs/storage)
  - **Miksi Firestore?** Vaikka alunperin harkittiin Cloud SQL:ää, Firestore valittiin POC-vaiheeseen sen ylivoimaisen kustannustehokkuuden ja minimaalisen hallinnointitarpeen vuoksi. Sen avokätinen ilmainen taso takaa, että projektin käyttökustannukset pysyvät todennäköisesti nollassa. NoSQL-dokumenttimalli on riittävän joustava ja tehokas ajojen (jobs), tulosten ja lokien tallentamiseen.
  - Cloud Storagea käytetään käyttäjien lataamien data-tiedostojen turvalliseen tallentamiseen.
- **Autentikointi:** [Firebase Authentication](https://firebase.google.com/docs/auth)
  - Tarjoaa valmiin, turvallisen ja helppokäyttöisen ratkaisun käyttäjien hallintaan.
- **AI-logiikka:** [Gemini (Googlen Genkitin kautta)](https://ai.google.dev/docs/genkit)
  - Gemini-mallit valitaan niiden monipuolisuuden ja tehokkuuden vuoksi. Genkit-kehys valitaan työkaluksi, koska se yksinkertaistaa AI-mallien integrointia, ketjuttamista ja tuotannollistamista.

## Datavirta (Execution Flow)

1.  **Käyttäjä** käynnistää uuden analyysin käyttöliittymästä.
2.  **Frontend (React)** tekee API-kutsun **Cloud Run -palveluun**.
3.  **Cloud Run (Python/Flask)** vastaanottaa pyynnön.
    - Se käyttää **Gemini/Genkit**-kirjastoa tehdäkseen älykkäitä päätöksiä (esim. solverin valinta).
    - Se tallentaa ajon tiedot (**Firestore**) ja mahdolliset tiedostot (**Cloud Storage**).
    - Se käynnistää varsinaisen laskennan (esim. Qiskit-simulaation) omassa prosessissaan.
    - Se päivittää ajon tilan, lokit ja tulokset Firestoreen.
4.  **Frontend** kuuntelee Firestore-tietokannan muutoksia (tai pollaa Cloud Run -endpointia) ja päivittää käyttöliittymän reaaliaikaisesti näyttääkseen ajon edistymisen ja tulokset.
