# Deployment Stack

## Suositeltu V1-pino

### Frontend
- Firebase Hosting
- React tai Next.js

### Auth
- Firebase Auth

### API / solver backend
- Google Cloud Run
- Python

### Queue / orchestration
- Google Cloud Tasks

### Database
- Supabase Postgres

### File storage
- Supabase Storage

### AI
- Gemini
- mahdollinen myöhempi fallback / toinen malli erikseen

### Quantum simulation
- Qiskit
- qiskit-aer

## Miksi juuri tämä pino

### Firebase
- hyvä frontend-hostaus
- luonteva yhteys Googlen AI-ekosysteemiin

### Cloud Run
- sopii Python- ja Qiskit-ajolle
- konttipohjainen
- hyvä POC:lle ilman omaa palvelinympäristöä

### Supabase
- relaatiodata
- storage
- yksinkertainen hallinta

## V1:n ulkopuolelle jätetään
- Kubernetes
- monimutkainen event bus
- useita rinnakkaisia worker-tyyppejä
- multi-region -arkkitehtuuri
