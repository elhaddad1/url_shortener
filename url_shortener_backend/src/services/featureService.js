const FeatureModel = require('../models/Feature');
const BaseService = require('./baseService');
const logger = require('../utils/logger');

class FeatureService extends BaseService {
    constructor() {
        super(FeatureModel);
    }

    async getFeatureByName(name) {
        try {
            const feature = await this.model.findOne({ name });
            if (!feature) throw new Error('feature not found');
            return feature;
        } catch (error) {
            throw new Error(`Error fetching feature by name: ${error.message}`);
        }
    }
}

module.exports = new FeatureService();