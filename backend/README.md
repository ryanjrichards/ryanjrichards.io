# Contact Form Backend

A Flask backend for handling contact form submissions with rate limiting and validation.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Adjust variables as needed

## Running the Server

1. Activate the virtual environment (if not already activated):
   ```bash
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Start the server:
   ```bash
   python app.py
   ```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response:**
- Success (200):
  ```json
  {
    "message": "Message received! I'll get back to you soon."
  }
  ```
- Error (400, 429, 500):
  ```json
  {
    "error": "Error message"
  }
  ```

## Rate Limiting

- 5 requests per hour per IP address
- In-memory rate limiting (consider using Redis for production)

## Production Considerations

1. Use a production-grade WSGI server (e.g., Gunicorn)
2. Implement proper email service integration
3. Add database storage for messages
4. Use Redis or similar for rate limiting
5. Add proper logging
6. Configure CORS appropriately
7. Add authentication if needed 