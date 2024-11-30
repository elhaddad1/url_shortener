const authController = require('../../controllers/v1/authController');
const createSharedRoutes = require('../base/authRoutes');

const customRoutes = (router) => {
    return router;
};

const router = createSharedRoutes(authController, customRoutes);
module.exports = router;
