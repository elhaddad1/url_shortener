const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    router.post('/shorten', controller.shortenUrl);
    router.get('/r/:slug', controller.redirect);
    router.get('/', controller.getURLs);
    router.get('/:id', controller.getUrlById);
    router.put('/:id', controller.updateUrl);
    router.delete('/:id', controller.deleteUrl);

    return customRoutes(router);
};
