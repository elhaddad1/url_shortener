const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/user/:id', controller.getUserById);

    return customRoutes(router);
};
