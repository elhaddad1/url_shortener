const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();
   
    router.post('/upgrade', controller.upgrade);
    
    return customRoutes(router);
};
