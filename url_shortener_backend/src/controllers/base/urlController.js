const authService = require('../../services/authService');
const urlService = require('../../services/urlService');
const logger = require('../../utils/logger');

class UrlController {
    async shortenUrl(req, res) {
        try {
            const { originalUrl } = req.body;

            if (!originalUrl) {
                return res.status(400).json({ error: 'Original URL is required.' });
            }

            const user = await authService.getUserByEmail('dev.msalah@gmail.com');
            logger.log(`user id => : ${user.id}`);
            const newUrl = await urlService.createShortUrl(originalUrl, user.id);

            return res.status(201).json({
                message: 'Short URL created successfully.',
                shortUrl: newUrl.shortUrl,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    async redirect(req, res) {
        try {
            const originalUrl = await urlService.getOriginalUrl(req.params.slug);
            if (!originalUrl) {
                return res.status(404).json({ error: 'Original URL not found.' });
            }
            return res.redirect(originalUrl);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    async getURLs(req, res) {
        try {
            const urls = await urlService.getAll(); // using BaseService's getAll method
            return res.status(200).json({
                message: 'URLs fetched successfully.',
                urls: urls,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    async getUrlById(req, res) {
        try {
            const { id } = req.params;
            const url = await urlService.getById(id);  // Using BaseService's getById method
            return res.status(200).json(url);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    async updateUrl(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedUrl = await urlService.update(id, updatedData);  // Using BaseService's update method
            return res.status(200).json({
                message: 'URL updated successfully.',
                url: updatedUrl,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    async deleteUrl(req, res) {
        try {
            const { id } = req.params;
            const deletedUrl = await urlService.delete(id);  // Using BaseService's delete method
            return res.status(200).json({
                message: 'URL deleted successfully.',
                url: deletedUrl,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports =  UrlController;
