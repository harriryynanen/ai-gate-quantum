
import firebase_admin
from firebase_admin import credentials, firestore

# Tämä skripti alustaa Firestore-tietokannan esimerkkidatalla.
# Se käyttää samoja oletustunnistetietoja kuin pääsovellus.

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)

db = firestore.client()

# Sama data, jota käytettiin aiemmin mock-toteutuksissa
mock_jobs = [
    {
        'id': 'job-1680100000',
        'name': 'Option pricing — Q4',
        'sub': 'mc_option_pricing',
        'solver': 'Classical',
        'solverType': 'classical',
        'status': 'In Progress',
        'duration': '—',
        'date': 'Today'
    },
    {
        'id': 'job-1680000000',
        'name': 'Insurance loss sim',
        'sub': 'insurance_loss_mc',
        'solver': 'Classical',
        'solverType': 'classical',
        'status': 'Completed',
        'duration': '2.3s',
        'date': '3 days ago'
    },
    {
        'id': 'job-1679900000',
        'name': 'Qiskit option pricing',
        'sub': 'qiskit_option_pricing_demo',
        'solver': 'Quantum',
        'solverType': 'quantum',
        'status': 'Completed',
        'duration': '8.7s',
        'date': '1 week ago'
    }
]

def seed_database():
    """Tallentaa mock_jobs-datan Firestoreen, käyttäen 'id'-kenttää dokumentin ID:nä."""
    jobs_collection = db.collection(u'jobs')
    print("Lisätään esimerkkidataa Firestoreen...")

    for job_data in mock_jobs:
        doc_id = job_data.pop('id') # Otetaan id pois ja käytetään sitä dokumentin nimenä
        jobs_collection.document(doc_id).set(job_data)
        print(f"  - Lisätty dokumentti: {doc_id}")

    print("Tietokannan alustus valmis.")

if __name__ == '__main__':
    seed_database()
