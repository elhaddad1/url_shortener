const urlService = require('../services/urlService');

exports.shorten = async (req, res, next) => {
    try {
        const shortUrl = await urlService.shorten(req.body);
        res.status(201).json(shortUrl);
    } catch (error) {
        next(error);
    }
};

exports.redirect = async (req, res, next) => {
    try {
        const originalUrl = await urlService.getOriginalUrl(req.params.slug);
        res.redirect(originalUrl);
    } catch (error) {
        next(error);
    }
};
