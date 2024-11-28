const mongoose = require('mongoose');
const { addBaseEntity } = require('../middleware/baseEntityMiddleware');

const FeatureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

addBaseEntity(FeatureSchema, mongoose);

module.exports = mongoose.model('Feature', FeatureSchema);
