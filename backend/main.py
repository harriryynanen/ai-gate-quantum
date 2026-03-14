
import os
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore
import google.generativeai as genai

# --- Alustus ----------------------------------------------------------------

# Alustetaan Firebase Admin SDK
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)
db = firestore.client()

# Alustetaan Gemini AI (turvallisesti)
api_key = os.getenv("GEMINI_API_KEY")
model = None
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')
else:
    print("VAROITUS: GEMINI_API_KEY -ympäristömuuttujaa ei löydy. Suoritetaan AI-mallia mock-tilassa.")

app = Flask(__name__)

# --- API-reitit -------------------------------------------------------------

@app.route('/jobs', methods=['GET'])
def get_jobs():
    """Hakee kaikki ajot 'jobs'-kokoelmasta Firestoresta."""
    try:
        jobs_ref = db.collection(u'jobs').stream()
        jobs = []
        for job in jobs_ref:
            job_data = job.to_dict()
            job_data['id'] = job.id
            jobs.append(job_data)
        return jsonify(jobs)
    except Exception as e:
        print(f"Virhe haettaessa ajoja: {e}")
        return jsonify({"error": "Tietokantahaku epäonnistui."}), 500

@app.route('/chat', methods=['POST'])
def chat_handler():
    """Käsittelee chat-pyynnöt ja palauttaa Geminin tai mock-vastauksen."""
    try:
        data = request.get_json()
        if not data or 'history' not in data:
            return jsonify({"error": "Pyynnössä on oltava 'history'-kenttä."}), 400

        # Jos Gemini-mallia ei ole alustettu (API-avain puuttuu), palauta mock-vastaus
        if not model:
            user_message = data['history'][-1]['parts'][0]['text']
            mock_response = f"(Mock Response) Thank you for describing your goal: '{user_message}'. This is a simulated answer because the GEMINI_API_KEY is not configured. Please proceed."
            return jsonify({"response": mock_response})

        history = data['history']
        chat_session = model.start_chat(history=history[:-1])
        user_message = history[-1]['parts'][0]['text']
        response = chat_session.send_message(user_message)

        return jsonify({"response": response.text})

    except Exception as e:
        print(f"Virhe chat-käsittelyssä: {e}")
        return jsonify({"error": f"AI-vastausta ei voitu luoda: {e}"}), 500

# --- Ajaminen ---------------------------------------------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
