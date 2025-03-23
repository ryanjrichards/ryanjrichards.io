# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables for Datadog
ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA
ARG DD_IAST_ENABLED
ARG DD_SERVICE
ARG DD_VERSION
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL} 
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}
ENV DD_IAST_ENABLED=${DD_IAST_ENABLED}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}
ENV DD_ENV=${DD_ENV}
ENV DD_LOGS_INJECTION=${DD_LOGS_INJECTION}
ENV DD_APPSEC_ENABLED=${DD_APPSEC_ENABLED}
ENV DD_PROFILING_ENABLED=${DD_PROFILING_ENABLED}


# Add Datadog labels
LABEL com.datadoghq.tags.service="${DD_SERVICE}"
LABEL com.datadoghq.tags.version="${DD_VERSION}"
LABEL com.datadoghq.tags.version="${DD_ENV}"

# Build the Next.js application
RUN NODE_ENV=production OPENAI_API_KEY=dummy npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]