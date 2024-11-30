const planController = require('../../controllers/v2/planController');
const createSharedRoutes = require('../base/planRoutes');

const customRoutes = (router) => {
    return router;
};

const router = createSharedRoutes(planController, customRoutes);
module.exports = router;
