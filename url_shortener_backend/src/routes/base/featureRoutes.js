const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    router.get('/', controller.getAllFeatures);
    router.get('/:id', controller.getFeatureById);
    router.get('/name/:name', controller.getFeatureByName);
    router.post('/', controller.createFeature);
    router.put('/:id', controller.updateFeature);
    router.delete('/:id', controller.deleteFeature);

    return customRoutes(router);
};
