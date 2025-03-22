from dotenv import load_dotenv
import os
from flask import Flask
from models import db

# Load environment variables
load_dotenv()

# Create a minimal Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///contact_form.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create all tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")