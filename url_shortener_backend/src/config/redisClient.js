const { createClient } = require('redis');
const logger = require('../utils/logger');

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`,
});

(async () => {
    try {
        await redisClient.connect();
        logger.info('Connected to Redis');
    } catch (err) {
        logger.error('Failed to connect to Redis:', err);
    }
})();

redisClient.on('error', (err) => {
    logger.error('Redis error:', err);
});

module.exports = redisClient;
