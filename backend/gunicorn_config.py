# Gunicorn configuration for production

# Server socket
bind = '0.0.0.0:5000'  # Change in production to your actual port

# Worker processes
workers = 3  # Recommended: 2-4 x number of CPU cores
worker_class = 'gevent'  # Use gevent for async handling
worker_connections = 1000
timeout = 30
keepalive = 2

# Logging
errorlog = 'logs/error.log'
accesslog = 'logs/access.log'
loglevel = 'info'

# Process naming
proc_name = 'contact-form-api'

# Server mechanics
daemon = False  # Set to True to run in the background

# SSL (uncomment and configure for HTTPS)
# keyfile = '/path/to/ssl/key.pem'
# certfile = '/path/to/ssl/cert.pem'