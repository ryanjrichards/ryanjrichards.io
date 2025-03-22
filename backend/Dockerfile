FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create logs directory
RUN mkdir -p /app/logs

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create non-root user for security
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 5000

# Create startup script
RUN echo '#!/bin/bash\n\
python -c "from app import app, db; app.app_context().push(); db.create_all()"\n\
exec gunicorn --config=gunicorn_config.py app:app\n\
' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Run with Gunicorn
CMD ["/app/entrypoint.sh"]