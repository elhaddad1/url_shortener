const urlController = require('../../controllers/v1/urlController');
const createSharedRoutes = require('../base/urlRoutes');

const customRoutes = (router) => {
    // Version-specific route (e.g., a new feature in v1)
    //router.get('/stats', urlController.getUrlStats);

    return router;
};

const router = createSharedRoutes(urlController, customRoutes);
module.exports = router;
