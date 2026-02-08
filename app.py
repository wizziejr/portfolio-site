from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_change_this'  # Needed for secure login sessions
DB_NAME = 'portfolio.db'

# --- Database Setup ---
def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        # Create Messages Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        # Create Projects Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                image TEXT,
                description TEXT,
                link TEXT
            )
        ''')
        conn.commit()

# Initialize DB on start
init_db()

# --- Routes for Pages ---
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    # Check if user is logged in
    if not session.get('logged_in'):
        return render_template('dashboard.html', needs_login=True)
    return render_template('dashboard.html', needs_login=False)

# --- API Routes (The Logic) ---

# 1. Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    # HARDCODED CREDENTIALS (As per your original code)
    if data['email'] == 'wj00755@gmail.com' and data['password'] == 'Wizzie07?':
        session['logged_in'] = True
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

# 2. Messages
@app.route('/api/contact', methods=['POST'])
def send_message():
    data = request.json
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
                       (data['name'], data['email'], data['message']))
        conn.commit()
    return jsonify({'success': True})

@app.route('/api/messages', methods=['GET'])
def get_messages():
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 403
    
    with sqlite3.connect(DB_NAME) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM messages ORDER BY date DESC")
        rows = cursor.fetchall()
        messages = [dict(row) for row in rows]
    return jsonify(messages)

@app.route('/api/messages/<int:id>', methods=['DELETE'])
def delete_message(id):
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 403
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute("DELETE FROM messages WHERE id = ?", (id,))
        conn.commit()
    return jsonify({'success': True})

# 3. Projects
@app.route('/api/projects', methods=['GET'])
def get_projects():
    with sqlite3.connect(DB_NAME) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects")
        projects = [dict(row) for row in sqlite3._RowFactoryOptions]
    return jsonify(projects)

@app.route('/api/projects', methods=['POST'])
def save_project():
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.json
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        if data.get('id'):
            # Update existing
            cursor.execute("""
                UPDATE projects SET title=?, image=?, description=?, link=? WHERE id=?
            """, (data['title'], data['image'], data['description'], data['link'], data['id']))
        else:
            # Create new
            cursor.execute("""
                INSERT INTO projects (title, image, description, link) VALUES (?, ?, ?, ?)
            """, (data['title'], data['image'], data['description'], data['link']))
        conn.commit()
    return jsonify({'success': True})

@app.route('/api/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 403
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute("DELETE FROM projects WHERE id = ?", (id,))
        conn.commit()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True, port=5000)