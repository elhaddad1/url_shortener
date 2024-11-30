const featureController = require('../../controllers/v1/featureController');
const createSharedRoutes = require('../base/featureRoutes');

const customRoutes = (router) => {
    return router;
};

const router = createSharedRoutes(featureController, customRoutes);
module.exports = router;
