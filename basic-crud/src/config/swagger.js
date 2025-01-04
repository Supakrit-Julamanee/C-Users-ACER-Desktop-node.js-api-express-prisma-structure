require('dotenv').config();
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Automatically generated API documentation using swagger-autogen',
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format: Bearer <your-token>',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = path.resolve(__dirname, '../../swagger-output.json');
const endpointsFiles = ['../app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);