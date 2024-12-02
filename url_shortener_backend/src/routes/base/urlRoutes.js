const express = require('express');

module.exports = (controller, customRoutes = (router) => router) => {
    const router = express.Router();

    /**
 * @swagger
 * /urls/shorten:
 *   post:
 *     summary: Shorten a given URL
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The original URL to be shortened
 *                 example: "https://example.com"
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Short URL created successfully."
 *                 shortUrl:
 *                   type: string
 *                   example: "http://short.ly/abcd1234"
 *       400:
 *         description: Missing original URL
 *       500:
 *         description: Internal Server Error
 * /urls/r/{slug}:
 *   get:
 *     summary: Redirect to the original URL based on the slug
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the shortened URL
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Slug not found
 *       500:
 *         description: Internal Server Error
 * /urls:
 *   get:
 *     summary: Get all shortened URLs
 *     tags: [URL]
 *     responses:
 *       200:
 *         description: A list of all shortened URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "URLs fetched successfully."
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the URL
 *                       shortUrl:
 *                         type: string
 *                         description: The shortened URL
 *       500:
 *         description: Internal Server Error
 * /urls/{id}:
 *   get:
 *     summary: Get a shortened URL by ID
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the URL
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A shortened URL object
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal Server Error
 *   put:
 *     summary: Update a shortened URL by ID
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the URL to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The original URL to be shortened
 *     responses:
 *       200:
 *         description: URL updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete a shortened URL by ID
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the URL to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal Server Error
 */
    router.post('/shorten', controller.shortenUrl);
    router.get('/r/:slug', controller.redirect);
    router.get('/', controller.getURLs);
    router.get('/:id', controller.getUrlById);
    router.put('/:id', controller.updateUrl);
    router.delete('/:id', controller.deleteUrl);

    return customRoutes(router);
};
