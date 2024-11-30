const urlController = require('../../controllers/v2/urlController');
const createSharedRoutes = require('../base/urlRoutes');


const customRoutes = (router) => {
    // Override an existing route for v2
    //router.post('/shorten', urlController.customShortenUrl);

    // Add a new version-specific route
    //router.post('/analytics', urlController.saveAnalytics);

    return router;
};

const router = createSharedRoutes(urlController, customRoutes);
module.exports = router;
