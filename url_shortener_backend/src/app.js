const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const { swaggerSpec, swaggerUi } = require('./config/swagger'); 

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Dynamic version handling
app.use('/api/:version', (req, res, next) => {
    const version = req.params.version;
    const versionPath = path.join(__dirname, `routes/${version}`);

    if (!fs.existsSync(versionPath)) {
        return res.status(404).json({ error: `API version ${version} not supported.` });
    }

    const versionRoutes = require(versionPath);
    
    app.use(`/api/${version}`, versionRoutes);
    
    next();
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

module.exports = app;