const BaseService = require('./baseService');
const UrlModel = require('../models/Url');
const crypto = require('crypto');
const logger = require('../utils/logger');

class UrlService extends BaseService {
    constructor() {
        super(UrlModel);
    }

    async createShortUrl(originalUrl, userId = 'System') {
        try {
            const urlWithTimestamp = originalUrl + Date.now();
            const hash = crypto.createHash('sha256').update(urlWithTimestamp).digest('hex');
            const shortHash = hash.substring(0, 8);
            const randomComponent = this.getRandomString(3);
            const shortUrl = shortHash + randomComponent;

            logger.log(`Generated short URL: ${shortUrl}`);

            const newUrl = await this.create({
                originalUrl,
                shortUrl,
                user: userId,
                createdBy: userId
            });

            logger.log(`New URL: ${newUrl}`);

            return newUrl;
        } catch (error) {
            logger.error('Error creating short URL:', error);
            throw new Error('Error creating short URL');
        }
    }

    async getOriginalUrl(shortUrl) {
        try {
            const urlRecord = await UrlModel.findOne({ shortUrl });
            if (!urlRecord) return null;
            return urlRecord.originalUrl;
        } catch (error) {
            logger.error('Error fetching original URL:', error);
            throw new Error('Error fetching original URL');
        }
    }

    getRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }
}

module.exports = new UrlService();
