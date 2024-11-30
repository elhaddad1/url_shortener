const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    router.post('/', controller.createPlan);
    router.get('/', controller.getPlans);
    router.get('/:id', controller.getPlanById);
    router.get('/name/:name', controller.getPlanByName);
    router.put('/:id', controller.updatePlan);
    router.delete('/:id', controller.deletePlan);

    return customRoutes(router);
};
