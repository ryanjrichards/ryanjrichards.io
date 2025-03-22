from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import re
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from models import db, ContactSubmission, RateLimitEntry

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure PostgreSQL database
postgres_user = os.getenv('POSTGRES_USER', 'postgres')
postgres_password = os.getenv('POSTGRES_PASSWORD', 'postgres')
postgres_host = os.getenv('POSTGRES_HOST', 'localhost')
postgres_port = os.getenv('POSTGRES_PORT', '5432')
postgres_db = os.getenv('POSTGRES_DB', 'contact_form')

# Build the database URL
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Rate limiting configuration
RATE_LIMIT_WINDOW = int(os.getenv('RATE_LIMIT_WINDOW', 3600))  # 1 hour in seconds
MAX_REQUESTS = int(os.getenv('MAX_REQUESTS', 5))

def is_rate_limited(ip):
    """Check if the IP is rate limited using database"""
    now = datetime.utcnow()
    cutoff_time = now - timedelta(seconds=RATE_LIMIT_WINDOW)
    
    # Count recent requests from this IP
    count = RateLimitEntry.query.filter(
        RateLimitEntry.ip_address == ip,
        RateLimitEntry.timestamp > cutoff_time
    ).count()
    
    if count >= MAX_REQUESTS:
        return True
    
    # Log this request
    entry = RateLimitEntry(ip_address=ip)
    db.session.add(entry)
    db.session.commit()
    
    return False

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

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        # Get client IP
        client_ip = request.remote_addr
        
        # For proxy setups, you might want to use X-Forwarded-For header
        if 'X-Forwarded-For' in request.headers:
            client_ip = request.headers.get('X-Forwarded-For', client_ip)

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

        # Create and save contact submission
        submission = ContactSubmission(
            name=name,
            email=email,
            message=message,
            ip_address=client_ip,
            user_agent=request.headers.get('User-Agent', '')
        )
        db.session.add(submission)
        db.session.commit()

        # Send notification email to admin
        notification_sent = send_email_notification(name, email, message)
        
        # If email sent successfully, update database record
        if notification_sent:
            submission.notified = True
            db.session.commit()
        
        # Send confirmation email to user
        confirmation_sent = send_confirmation_email(name, email)
        
        # Return status in development mode
        email_status = "Emails sent successfully" if notification_sent and confirmation_sent else "Email sending disabled or failed"
        
        return jsonify({
            'message': 'Message received! I\'ll get back to you soon.',
            'debug': email_status if os.getenv('FLASK_ENV') == 'development' else None
        })

    except Exception as e:
        print('Error processing contact form:', str(e))
        return jsonify({
            'error': 'Something went wrong. Please try again.'
        }), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'database': 'PostgreSQL'
    })

# Admin endpoint to fetch submissions (protected, would need authentication in production)
@app.route('/api/admin/submissions', methods=['GET'])
def list_submissions():
    # In production, you'd require authentication here
    if os.getenv('FLASK_ENV') != 'development':
        return jsonify({'error': 'Not authorized'}), 403
        
    submissions = ContactSubmission.query.order_by(ContactSubmission.created_at.desc()).all()
    return jsonify({
        'submissions': [s.to_dict() for s in submissions]
    })

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    # Create database tables
    with app.app_context():
        db.create_all()
        
    app.run(host='0.0.0.0', port=port, debug=debug)