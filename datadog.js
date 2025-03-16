// datadog.js
const tracer = require('dd-trace').init({
    service: 'portfolio', // Your application name
    env: process.env.NODE_ENV, // This will be 'development' or 'production'
    version: process.env.npm_package_version || '1.0.0',
    // Add any other configuration options here
  });
  
  module.exports = tracer;