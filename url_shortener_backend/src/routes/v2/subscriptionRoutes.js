const subscriptionController = require('../../controllers/v2/subscriptionController');
const createSharedRoutes = require('../base/subscriptionRoutes');

const customRoutes = (router) => {
    return router;
};

const router = createSharedRoutes(subscriptionController, customRoutes);
module.exports = router;
