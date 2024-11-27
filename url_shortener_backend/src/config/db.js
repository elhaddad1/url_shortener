const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        console.log('Mongo URI:', process.env.MONGO_URI); 
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });

        mongoose.connection.on('connected', () => {
            logger.log('Mongoose connected to', process.env.MONGO_URI);
        });

        mongoose.connection.on('error', (err) => {
            logger.log('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            logger.log('Mongoose disconnected');
        });

        logger.log('MongoDB connected');
    } catch (err) {
        logger.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;