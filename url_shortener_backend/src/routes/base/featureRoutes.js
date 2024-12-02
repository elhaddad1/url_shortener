const express = require('express');


module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    /**
     * @swagger
     * /features:
     *   get:
     *     summary: Get all features
     *     tags: [Feature]
     *     responses:
     *       200:
     *         description: A list of features
     *       500:
     *         description: Internal Server Error
     *   post:
     *     summary: Create a new feature
     *     tags: [Feature]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the feature
     *               description:
     *                 type: string
     *                 description: A description of the feature
     *     responses:
     *       201:
     *         description: Feature created successfully
     *       400:
     *         description: Missing required fields (name)
     *       500:
     *         description: Internal Server Error
     * /features/{id}:
     *   get:
     *     summary: Get a feature by ID
     *     tags: [Feature]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The ID of the feature
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: A feature object
     *       500:
     *         description: Internal Server Error
     *   put:
     *     summary: Update an existing feature by ID
     *     tags: [Feature]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The ID of the feature
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
     *                 description: The name of the feature
     *               description:
     *                 type: string
     *                 description: A description of the feature
     *     responses:
     *       200:
     *         description: Feature updated successfully
     *       400:
     *         description: Invalid ID or request body
     *       500:
     *         description: Internal Server Error
     *   delete:
     *     summary: Delete a feature by ID
     *     tags: [Feature]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The ID of the feature
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Feature deleted successfully
     *       500:
     *         description: Internal Server Error
     * /features/name/{name}:
     *   get:
     *     summary: Get a feature by name
     *     tags: [Feature]
     *     parameters:
     *       - in: path
     *         name: name
     *         required: true
     *         description: The name of the feature
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: A feature object
     *       500:
     *         description: Internal Server Error
     */
    router.get('/', controller.getAllFeatures);
    router.get('/:id', controller.getFeatureById);
    router.get('/name/:name', controller.getFeatureByName);
    router.post('/', controller.createFeature);
    router.put('/:id', controller.updateFeature);
    router.delete('/:id', controller.deleteFeature);

    return customRoutes(router);
};
