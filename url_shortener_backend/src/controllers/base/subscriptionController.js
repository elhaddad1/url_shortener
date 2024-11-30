const subscriptionService = require('../../services/subscriptionService');

class SubscriptionController {
    async upgrade(req, res, next) {
        try {
            const result = await subscriptionService.upgrade(req.user.id, req.body.plan);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SubscriptionController;
