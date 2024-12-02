const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();
   
    /**
 * @swagger
 * /subscription/upgrade:
 *   post:
 *     summary: Upgrade a user's subscription plan
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan:
 *                 type: string
 *                 description: The new subscription plan to upgrade to
 *                 example: "premium"
 *     responses:
 *       200:
 *         description: Subscription upgraded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription upgraded successfully."
 *                 result:
 *                   type: object
 *                   description: The result of the upgrade operation (e.g., updated subscription data)
 *       400:
 *         description: Bad request, missing or invalid plan data
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal Server Error
 */
    router.post('/upgrade', controller.upgrade);
    
    return customRoutes(router);
};
