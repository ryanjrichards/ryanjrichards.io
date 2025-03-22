# Save as test_server_db.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure PostgreSQL - using the same environment variables
postgres_user = os.getenv('POSTGRES_USER', 'postgres')
postgres_password = os.getenv('POSTGRES_PASSWORD', 'postgres')
postgres_host = os.getenv('POSTGRES_HOST', 'localhost')
postgres_port = os.getenv('POSTGRES_PORT', '5432')
postgres_db = os.getenv('POSTGRES_DB', 'contact_form')

# Build the database URL
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Define a simple model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "database": "PostgreSQL"})


@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        print("Received data:", data)
        
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validate required fields
        if not all([name, email, message]):
            return jsonify({"error": "All fields are required"}), 400

        # Create a new contact entry
        new_contact = Contact(
            name=name,
            email=email,
            message=message
        )
        
        # Add to database
        db.session.add(new_contact)
        db.session.commit()
        
        # Send notification email to admin
        notification_sent = send_email_notification(name, email, message)
        print(f"Notification email result: {notification_sent}")
        
        # Send confirmation email to user
        confirmation_sent = send_confirmation_email(name, email)
        print(f"Confirmation email result: {confirmation_sent}")
        
        # Return detailed status
        return jsonify({
            "message": "Message received! I'll get back to you soon.",
            "debug": {
                "notification_email_sent": notification_sent,
                "confirmation_email_sent": confirmation_sent,
                "notification_email": os.getenv('NOTIFICATION_EMAIL')
            }
        })
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    try:
        data = request.get_json()
        print("Received data:", data)
        
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validate required fields
        if not all([name, email, message]):
            return jsonify({"error": "All fields are required"}), 400

        # Create a new contact entry
        new_contact = Contact(
            name=name,
            email=email,
            message=message
        )
        
        # Add to database
        db.session.add(new_contact)
        db.session.commit()
        
        # Send notification email to admin
        notification_sent = send_email_notification(name, email, message)
        
        # Send confirmation email to user
        confirmation_sent = send_confirmation_email(name, email)
        
        # Return status in development mode
        email_status = "Emails sent successfully" if notification_sent and confirmation_sent else "Email sending disabled or failed"
        
        return jsonify({
            "message": "Message received! I'll get back to you soon.",
            "debug": email_status if os.getenv('FLASK_ENV') == 'development' else None
        })
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    try:
        data = request.get_json()
        print("Received data:", data)
        
        # Create a new contact entry
        new_contact = Contact(
            name=data.get('name'),
            email=data.get('email'),
            message=data.get('message')
        )
        
        # Add to database
        db.session.add(new_contact)
        db.session.commit()
        
        return jsonify({"message": "Message received! I'll get back to you soon."})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    
def send_email_notification(name, email, message):
    """Send email notification when a contact form is submitted"""
    # Only attempt to send if email settings are configured
    if not all([
        os.getenv('SMTP_SERVER'),
        os.getenv('SMTP_PORT'),
        os.getenv('EMAIL_USER'),
        os.getenv('EMAIL_PASSWORD'),
        os.getenv('NOTIFICATION_EMAIL')
    ]):
        print("Email settings not configured. Skipping email notification.")
        return False
    
    try:
        # Email configuration
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = int(os.getenv('SMTP_PORT', 587))
        email_user = os.getenv('EMAIL_USER')
        email_password = os.getenv('EMAIL_PASSWORD')
        notification_email = os.getenv('NOTIFICATION_EMAIL')
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email_user
        msg['To'] = notification_email
        msg['Subject'] = f"New Contact Form Submission from {name}"
        
        body = f"""
        You've received a new message from your website contact form:
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        
        Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(email_user, email_password)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Failed to send email notification: {str(e)}")
        return False

def send_confirmation_email(name, email):
    """Send confirmation email to the user who submitted the form"""
    # Only attempt to send if email settings are configured
    if not all([
        os.getenv('SMTP_SERVER'),
        os.getenv('SMTP_PORT'),
        os.getenv('EMAIL_USER'),
        os.getenv('EMAIL_PASSWORD')
    ]):
        print("Email settings not configured. Skipping confirmation email.")
        return False
    
    try:
        # Email configuration
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = int(os.getenv('SMTP_PORT', 587))
        email_user = os.getenv('EMAIL_USER')
        email_password = os.getenv('EMAIL_PASSWORD')
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email_user
        msg['To'] = email
        msg['Subject'] = "Thanks for contacting Ryan J Richards"
        
        body = f"""
        Hello {name},
        
        Thank you for reaching out! I've received your message and will get back to you as soon as possible.
        
        Best regards,
        Ryan J Richards
        Enterprise Sales Engineer at Datadog
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(email_user, email_password)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Failed to send confirmation email: {str(e)}")
        return False

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(host='0.0.0.0', port=8080, debug=True)