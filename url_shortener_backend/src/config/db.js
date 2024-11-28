const mongoose = require('mongoose');
const logger = require('../utils/logger');
const Feature = require('../models/Feature'); // Include your models
const Plan = require('../models/Plan');

const connectDB = async () => {
    try {
        logger.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });

        mongoose.connection.on('connected', () => {
            logger.info('Mongoose connected to', process.env.MONGO_URI);
        });

        mongoose.connection.on('error', (err) => {
            logger.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('Mongoose disconnected');
        });

        logger.info('MongoDB connected successfully');
    } catch (err) {
        logger.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        logger.info('Seeding data into MongoDB...');

        const features = await Feature.insertMany([
            { name: 'Link Analytics', description: 'Track your link performance' },
            { name: 'Branded Domains', description: 'Custom domain for branding' },
        ]);
        logger.info('Features seeded:', features);

        const plans = await Plan.insertMany([
            { name: 'Free', price: 0, features: [features[0]._id] },
            { name: 'Pro', price: 19.99, features: [features[0]._id, features[1]._id] },
        ]);
        logger.info('Plans seeded:', plans);

        process.exit(0); 
    } catch (error) {
        logger.error('Error seeding data:', error.message);
        process.exit(1);
    }
};
if (process.env.SEED_DB === 'true') {
    connectDB().then(seedData);
}

module.exports = connectDB;
