
import firebase_admin
from firebase_admin import credentials, firestore
import datetime

# --- Konfiguraatio ---
# Tämä skripti käyttää Application Default Credentials (ADC).
# Varmista, että olet autentikoinut itsesi paikallisesti ennen ajoa komennolla:
# gcloud auth application-default login
# ---------------------

# Alusta Firebase Admin SDK
try:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)
except ValueError:
    print("Firebase app already initialized.")

db = firestore.client()

# Data, joka lisätään tietokantaan
mock_jobs = [
    {
        'id': 'job-1680100000',
        'name': 'Option pricing — Q4',
        'sub': 'mc_option_pricing',
        'solver': 'Classical',
        'solverType': 'classical',
        'status': 'In Progress',
        'duration': '—',
        'date': 'Today',
        'createdAt': datetime.datetime.now(datetime.timezone.utc)
    },
    {
        'id': 'job-1680000000',
        'name': 'Insurance loss sim',
        'sub': 'insurance_loss_mc',
        'solver': 'Classical',
        'solverType': 'classical',
        'status': 'Completed',
        'duration': '2.3s',
        'date': '3 days ago',
        'createdAt': datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=3)
    },
    {
        'id': 'job-1679900000',
        'name': 'Qiskit option pricing',
        'sub': 'qiskit_option_pricing_demo',
        'solver': 'Quantum',
        'solverType': 'quantum',
        'status': 'Completed',
        'duration': '8.7s',
        'date': '1 week ago',
        'createdAt': datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(weeks=1)
    }
]

def seed_database():
    """Lisää mock_jobs-datan Firestoreen 'jobs'-kokoelmaan."""
    jobs_collection_ref = db.collection('jobs')
    
    print("Tarkistetaan ja lisätään dataa Firestoreen...")
    
    for job_data in mock_jobs:
        job_id = job_data['id']
        doc_ref = jobs_collection_ref.document(job_id)
        
        doc = doc_ref.get()
        if doc.exists:
            print(f"Dokumentti ID:llä '{job_id}' on jo olemassa. Ohitetaan.")
        else:
            print(f"Lisätään dokumentti ID:llä '{job_id}'...")
            # Poistetaan väliaikainen 'id', koska se on dokumentin avain
            temp_data = job_data.copy()
            del temp_data['id']
            doc_ref.set(temp_data)
            print(f"  -> Lisätty.")
            
    print("\nTietokannan alustus valmis!")

if __name__ == '__main__':
    seed_database()
