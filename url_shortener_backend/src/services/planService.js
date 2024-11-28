const BaseService = require('./baseService');
const PlanModel = require('../models/Plan');

class PlanService extends BaseService {
    constructor() {
        super(PlanModel);
    }

    async getPlanByName(name) {
        try {
            const plan = await this.model.findOne({ name });
            if (!plan) throw new Error('Plan not found');
            return plan;
        } catch (error) {
            throw new Error(`Error fetching plan by name: ${error.message}`);
        }
    }
}

module.exports = new PlanService();