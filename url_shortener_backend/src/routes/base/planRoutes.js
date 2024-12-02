const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();
    /**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all plans
 *     tags: [Plan]
 *     responses:
 *       200:
 *         description: A list of plans
 *       500:
 *         description: Internal Server Error
 *   post:
 *     summary: Create a new plan
 *     tags: [Plan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the plan
 *               description:
 *                 type: string
 *                 description: A description of the plan
 *               price:
 *                 type: number
 *                 description: The price of the plan
 *               duration:
 *                 type: integer
 *                 description: The duration of the plan in days
 *     responses:
 *       201:
 *         description: Plan created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 * /plans/{id}:
 *   get:
 *     summary: Get a plan by ID
 *     tags: [Plan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the plan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A plan object
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Internal Server Error
 *   put:
 *     summary: Update an existing plan by ID
 *     tags: [Plan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the plan
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the plan
 *               description:
 *                 type: string
 *                 description: A description of the plan
 *               price:
 *                 type: number
 *                 description: The price of the plan
 *               duration:
 *                 type: integer
 *                 description: The duration of the plan in days
 *     responses:
 *       200:
 *         description: Plan updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete a plan by ID
 *     tags: [Plan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the plan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan deleted successfully
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Internal Server Error
 * /plans/name/{name}:
 *   get:
 *     summary: Get a plan by name
 *     tags: [Plan]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the plan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A plan object
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Internal Server Error
 */
    router.post('/', controller.createPlan);
    router.get('/', controller.getPlans);
    router.get('/:id', controller.getPlanById);
    router.get('/name/:name', controller.getPlanByName);
    router.put('/:id', controller.updatePlan);
    router.delete('/:id', controller.deletePlan);

    return customRoutes(router);
};
