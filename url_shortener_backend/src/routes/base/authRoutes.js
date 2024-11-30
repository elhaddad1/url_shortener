const express = require('express');


module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/user/:id', controller.getUserById);

    return customRoutes(router);
};
