from flask import Flask, render_template, request, jsonify, session
import sqlite3
import datetime
from functools import wraps

app = Flask(__name__)
app.secret_key = 'super_secret_session_key' # Needed for sessions
DB_NAME = "portfolio.db"

# --- YOUR API KEY ---
API_KEY = "b6aa043ea334c6c9201ef492863b640f3d19c295"

# --- Database Setup ---
def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                date TEXT NOT NULL
            )
        ''')
        conn.commit()

# --- Security: API Key Checker ---
def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check if the key is sent in headers
        headers_key = request.headers.get('x-api-key')
        if headers_key == API_KEY:
            return f(*args, **kwargs)
        else:
            return jsonify({"error": "Unauthorized: Invalid API Key"}), 401
    return decorated_function

# --- Routes (Pages) ---
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# --- API Endpoints (The Logic) ---

@app.route('/api/contact', methods=['POST'])
@require_api_key  # <--- This locks the door!
def save_message():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if not name or not email or not message:
        return jsonify({"error": "Missing fields"}), 400

    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)",
                       (name, email, message, date))
        conn.commit()
    
    return jsonify({"status": "success", "message": "Message saved securely!"}), 201

@app.route('/api/messages', methods=['GET'])
@require_api_key
def get_messages():
    with sqlite3.connect(DB_NAME) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM messages ORDER BY id DESC")
        rows = cursor.fetchall()
        
        messages = [{"id": r["id"], "name": r["name"], "email": r["email"], "message": r["message"], "date": r["date"]} for r in rows]
            
    return jsonify(messages)

@app.route('/api/messages/<int:msg_id>', methods=['DELETE'])
@require_api_key
def delete_message(msg_id):
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM messages WHERE id = ?", (msg_id,))
        conn.commit()
    return jsonify({"status": "deleted"})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000, host='0.0.0.0')