from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import re
from collections import defaultdict
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Rate limiting configuration
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds
MAX_REQUESTS = 5

# In-memory store for rate limiting
# In production, you'd want to use Redis or a similar solution
rate_limit_store = defaultdict(list)

def is_rate_limited(ip):
    now = datetime.now()
    # Clean up old requests
    rate_limit_store[ip] = [
        timestamp for timestamp in rate_limit_store[ip]
        if now - timestamp < timedelta(seconds=RATE_LIMIT_WINDOW)
    ]
    # Check if rate limit is exceeded
    if len(rate_limit_store[ip]) >= MAX_REQUESTS:
        return True
    # Add current request
    rate_limit_store[ip].append(now)
    return False

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        # Get client IP
        client_ip = request.remote_addr

        # Check rate limit
        if is_rate_limited(client_ip):
            return jsonify({
                'error': 'Too many requests. Please try again later.'
            }), 429

        # Get form data
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Validate required fields
        if not all([name, email, message]):
            return jsonify({
                'error': 'All fields are required'
            }), 400

        # Validate email format
        email_regex = re.compile(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
        if not email_regex.match(email):
            return jsonify({
                'error': 'Invalid email format'
            }), 400

        # Log the submission (in production, you'd want to store this in a database)
        print('Contact form submission:', {
            'name': name,
            'email': email,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'ip': client_ip
        })

        # Here you would typically:
        # 1. Send an email notification
        # 2. Store in database
        # 3. Trigger any other necessary actions

        return jsonify({
            'message': 'Message received! I\'ll get back to you soon.'
        })

    except Exception as e:
        print('Error processing contact form:', str(e))
        return jsonify({
            'error': 'Something went wrong. Please try again.'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug) 