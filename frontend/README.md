# Ryan J Richards - Portfolio

This is my personal portfolio website built with [Next.js](https://nextjs.org), showcasing my work as an Enterprise Sales Engineer at Datadog. The site features integrated Datadog observability and modern web development practices.

## Features

- **Professional Portfolio**: Sections for About, Projects, My Teams, and Contact information
- **Datadog Integration**: Built-in observability using Datadog's monitoring solutions
- **Modern UI**: Responsive design with Tailwind CSS and Next.js
- **Performance Optimized**: Uses Next.js 14 features and optimized fonts
- **Social Links**: Direct connections to GitHub and LinkedIn profiles

## Getting Started

First, run the development server:

```bash
npm run dev
```

The site will run on port 3001 by default. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Environment Setup

The application requires the following environment variables:

### Datadog RUM (Browser Monitoring)
- `NEXT_PUBLIC_DD_APPLICATION_ID`: Your Datadog RUM application ID
- `NEXT_PUBLIC_DD_CLIENT_TOKEN`: Your Datadog RUM client token

### Datadog APM (Server Monitoring)
- `DD_APPLICATION_ID`: Your Datadog APM application ID
- `DD_CLIENT_TOKEN`: Your Datadog APM client token
- `DD_SITE`: Your Datadog site (e.g., 'datadoghq.com')
- `DD_ENV`: Environment setting (e.g., 'production', 'development')

Create a `.env.local` file in the project root with these values. Do not commit this file to the repository.

Example `.env.local`:
```env
# RUM (Browser monitoring)
NEXT_PUBLIC_DD_APPLICATION_ID=your-rum-app-id
NEXT_PUBLIC_DD_CLIENT_TOKEN=your-rum-client-token

# APM (Server monitoring)
DD_APPLICATION_ID=your-apm-app-id
DD_CLIENT_TOKEN=your-apm-client-token
DD_SITE=datadoghq.com
DD_ENV=development
```

## Project Structure

- `/app`: Main application pages and layouts
- `/components`: Reusable React components
- `/public`: Static assets and images
- `/styles`: Global CSS and styling configurations

## Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Monitoring**: Datadog
- **Deployment**: Configured for easy deployment

## Development

The site auto-updates as you edit the files. Key files:

- `app/page.js`: Main landing page
- `app/layout.js`: Root layout with navigation
- `components/datadog-init.tsx`: Datadog initialization

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Datadog Documentation](https://docs.datadoghq.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
