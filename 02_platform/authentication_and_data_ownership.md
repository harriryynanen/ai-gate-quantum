# Authentication and Data Ownership

## V1-suositus

### Käyttäjän tunnistus
- Firebase Auth
- käyttäjä tunnistetaan Firebase ID tokenilla
- Cloud Run tarkistaa tokenin jokaisella suojatulla pyynnöllä

### Data ownership
Jokainen resurssi sidotaan vähintään seuraaviin:
- `user_id`
- `session_id`
- `job_id` (jos soveltuu)

## Miksi ei Supabase Auth V1:ssä
Supabase Auth on hyvä, mutta tässä POC:ssa:
- frontend on Firebase-pohjainen
- Gemini/Firebase-ekosysteemi on luonteva
- kahden auth-järjestelmän rinnakkainen käyttö lisäisi turhaa monimutkaisuutta

## Suositeltu käyttömalli

### Frontend
- kirjautuminen Firebase Authilla

### Backend
- Cloud Run lukee käyttäjän identiteetin Firebase-tokenista
- backend käyttää Supabasea service-roolilla

### Database access
- frontend ei kirjoita suoraan solver-ajodataan
- kaikki domain-data kulkee backendin kautta

## Tietokannan omistajuus
Suositeltu perusmalli:
- yksi käyttäjä = omat sessionit, datasetit ja ajot
- myöhemmin voidaan lisätä workspace / organization -taso
