const redisClient = require('../config/redisClient');
const logger = require('../utils/logger');

const rateLimiter = (maxRequests, windowMinutes) => {
    return async (req, res, next) => {
        
        try {
            const userIP = req.ip;
            const key = `rate-limit:${userIP}:${req.originalUrl}`;

            const requests = await redisClient.get(key);

            if (requests && parseInt(requests) >= maxRequests) {
                return res.status(429).json({ message: 'Too many requests, please try again later.' });
            }

            const newRequestCount = requests ? parseInt(requests) + 1 : 1;
            await redisClient.setEx(key, windowMinutes * 60, newRequestCount.toString());

            logger.log(
                `maxRequests => : ${maxRequests} - windowMinutes => : ${windowMinutes} - userIP => : ${userIP} - key => : ${key}`
            );
            next();
        } catch (err) {
            logger.error('Rate limiter error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = rateLimiter;
