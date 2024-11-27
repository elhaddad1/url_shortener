const urlService = require('../services/urlService');

exports.shortenUrl = async (req, res, next) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: 'Original URL is required.' });
        }

        const newUrl = await urlService.createShortUrl(originalUrl);

        return res.status(201).json({
            message: 'Short URL created successfully.',
            shortUrl: newUrl.shortUrl,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getURLs = async (req, res, next) => {
    try {
        return res.status(200).json({
            message: 'urls ',
            urls: await urlService.getURLs()
        });
    } catch (error) {
        next(error); 
    }
};

exports.redirect = async (req, res, next) => {
    try {
        return res.redirect(await urlService.getOriginalUrl(req.params.slug));
    } catch (error) {
        next(error); 
    }
};