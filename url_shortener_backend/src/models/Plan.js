const mongoose = require('mongoose');
const { addBaseEntity } = require('../middleware/baseEntityMiddleware');

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }, // Monthly price
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }], // Link to features
});

addBaseEntity(PlanSchema, mongoose);

module.exports = mongoose.model('Plan', PlanSchema);
