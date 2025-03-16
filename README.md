# Next.js Docker Application

This is a Next.js application configured for Docker deployment.

## Development

For local development without Docker:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000.

## Docker Development

To build and run the Docker container locally:

```bash
# Build the Docker image
docker build -t my-nextjs-app .

# Run the container
docker run -p 3000:3000 my-nextjs-app
```

Or, using Docker Compose:

```bash
docker-compose up
```

The application will be available at http://localhost:3000.

## Production Deployment

For production deployment:

1. Build the Docker image:
   ```bash
   docker build -t my-nextjs-app:production .
   ```

2. Push to your container registry (if applicable):
   ```bash
   docker tag my-nextjs-app:production your-registry.com/my-nextjs-app:production
   docker push your-registry.com/my-nextjs-app:production
   ```

3. On your server, pull and run the image:
   ```bash
   docker pull your-registry.com/my-nextjs-app:production
   docker run -d -p 3000:3000 --restart always your-registry.com/my-nextjs-app:production
   ```

## Environment Variables

To use environment variables, add them to your `.env` file (for local development) or pass them to the Docker container:

```bash
docker run -p 3000:3000 -e DATABASE_URL=your-url my-nextjs-app
```

Or add them to the `docker-compose.yml` file:

```yaml
environment:
  - DATABASE_URL=your-url
  - NEXT_PUBLIC_API_URL=https://api.example.com
```

## Notes

- The application uses the Next.js standalone output option for optimal Docker image size.
- The Docker image runs as a non-root user for better security.
- The application is configured to run on port 3000 by default.