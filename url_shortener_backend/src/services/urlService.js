const UrlModel = require('../models/Url');
const crypto = require('crypto');
const logger = require('../utils/logger');

exports.createShortUrl = async (originalUrl) => {
    try {
        const urlWithTimestamp = originalUrl + Date.now();
        const hash = crypto.createHash('sha256').update(urlWithTimestamp).digest('hex');
        const shortHash = hash.substring(0, 8);
        const randomComponent = getRandomString(3);
        const shortUrl = shortHash + randomComponent;

        logger.log(`Generated short URL: ${shortUrl}`);

        const newUrl = new UrlModel({
            originalUrl,
            shortUrl,
        });

        await newUrl.save();
        return newUrl;  
    } catch (error) {
        logger.error('Error creating short URL:', error);
        throw new Error('Error creating short URL'); 
    }
};

exports.getURLs = async()=>{
    try {
        return await UrlModel.find();
    } catch (error) {
        logger.error('Error fetching URLs:', error);
        throw new Error('Error fetching URLs'); 
    }
};

exports.getOriginalUrl = async (shortUrl) => {
    try {
        const urlRecord = await UrlModel.findOne({ shortUrl });

        if (urlRecord) {
            return urlRecord.originalUrl;
        } else {
            throw new Error('Short URL not found');
        }
    } catch (error) {
        logger.error('Error fetching original URL:', error);
        throw new Error('Error fetching original URL'); 
    }
};

// generate a random alphanumeric string
function getRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}