# Architecture Overview

## High-level stack

### Frontend
- Firebase Hosting
- React/Next.js-tyyppinen web UI
- Firebase Auth

### AI layer
- Gemini ensisijaisena AI-avustajana
- AI:n rooli:
  - ongelman tulkinta
  - solver-ehdotus
  - datamappingin ehdotus
  - tulosten selitys
- AI ei ole vapaan koodiajon ohjaava agentti

### Execution layer
- Google Cloud Run
- Python API + worker(s)
- kaikki laskenta kulkee Pythonin kautta

### Job orchestration
- Google Cloud Tasks
- tilalliset jobit ja statuspäivitykset

### Database + storage
- Supabase Postgres
- Supabase Storage

### Quantum layer
- Qiskit
- Qiskit Aer
- mahdollisesti fake backend / noise model myöhemmin

## Keskeinen periaate

Järjestelmä jakautuu kolmeen näkyvään vaiheeseen:

1. **Discover / Define**
   - chat
   - solver-ehdotus
   - dataodotukset

2. **Prepare / Validate**
   - upload
   - profile
   - mapping
   - cleaning
   - approval

3. **Run / Interpret**
   - job execution
   - code snapshot
   - logs
   - results
   - AI discussion on result page

## Pääkomponentit

### 1. Session Manager
Hallitsee yhtä analysis sessionia.

### 2. Data Intake Layer
Ottaa datan vastaan ja tuottaa solver-ready datasetin.

### 3. Solver Registry
Tietää mitä solvereita järjestelmä osaa ajaa.

### 4. Solver Engine
Ajaa valitun solverin Pythonissa.

### 5. Result Renderer
Renderöi tulokset result schema -tyypin mukaan.

### 6. Contextual AI Panel
Tulkitsee juuri tämän ajon dataa, koodia ja tuloksia.
