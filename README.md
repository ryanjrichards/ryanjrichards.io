# Ryan J Richards Portfolio

This is the source code for Ryan J Richards' personal portfolio website. The website showcases Ryan's professional background, projects, and interests.

## Project Structure

The project is structured as follows:

- **frontend/**: Contains the Next.js frontend application.
  - **src/**: Source code for the frontend application.
    - **app/**: Contains the main application pages and components.
    - **components/**: Reusable components used across the application.
  - **public/**: Static assets such as images and icons.
  - **Dockerfile**: Docker configuration for containerizing the application.
  - **package.json**: Project dependencies and scripts.
  - **postcss.config.mjs**: PostCSS configuration for Tailwind CSS.

## Setup Instructions

### Prerequisites

- Node.js (version 18 or later)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ryanjrichards/portfolio.git
   cd portfolio/frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the `frontend` directory and add the following environment variables:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
OPENAI_API_KEY=your_groq_api_key
```

### Running the Application

To start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3001`.

### Building for Production

To build the application for production:

```sh
npm run build
```

To start the production server:

```sh
npm start
```

The application will be available at `http://localhost:3000`.

### Docker

To build and run the application using Docker:

1. Build the Docker image:

   ```sh
   docker build -t portfolio-frontend .
   ```

2. Run the Docker container:

   ```sh
   docker run -p 3000:3000 portfolio-frontend
   ```

The application will be available at `http://localhost:3000`.

## Usage

### Pages

- **Home**: Introduction and links to other sections.
- **About**: Information about Ryan's professional background and expertise.
- **Projects**: Showcase of Ryan's projects.
- **Fandom**: Information about Ryan's favorite sports teams.
- **Travel**: Map of places Ryan has lived.
- **Connect**: Contact form and quick connect options.
- **AI Assistant**: Interactive AI chatbot to learn more about Ryan.

### Components

- **Navigation**: Main navigation bar.
- **ProjectCard**: Card component for displaying project details.
- **TeamLogo**: Component for displaying team logos.
- **ContactForm**: Form for sending messages to Ryan.
- **QuickConnect**: Quick connect options for email and social media.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
