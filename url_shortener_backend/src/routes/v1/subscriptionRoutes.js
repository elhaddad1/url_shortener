const subscriptionController = require('../../controllers/v1/subscriptionController');
const createSharedRoutes = require('../base/subscriptionRoutes');

const customRoutes = (router) => {
    return router;
};

const router = createSharedRoutes(subscriptionController, customRoutes);
module.exports = router;
