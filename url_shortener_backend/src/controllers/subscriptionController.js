const subscriptionService = require('../services/subscriptionService');

exports.upgrade = async (req, res, next) => {
    try {
        const result = await subscriptionService.upgrade(req.user.id, req.body.plan);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
