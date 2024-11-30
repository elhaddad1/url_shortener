// src/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API Documentation', // Title of your API
        version: '1.0.0',              // API version
        description: 'API documentation for my Express application'
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1', // API base URL for version 1
            description: 'Version 1 API'
        },
        {
            url: 'http://localhost:3000/api/v2', // API base URL for version 2
            description: 'Version 2 API'
        }
    ]
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: [
        './src/routes/base/*.js',
        './src/routes/v1/*.js', // Scan all v1 route files
        './src/routes/v2/*.js'  // Scan all v2 route files
    ]
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec,
    swaggerUi
};
