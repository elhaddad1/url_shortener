const mongoose = require('mongoose');
const { addBaseEntity } = require('../middleware/baseEntityMiddleware');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
    subscriptionStart: { type: Date },
    subscriptionEnd: { type: Date },
});

addBaseEntity(UserSchema, mongoose);
module.exports = mongoose.model('User', UserSchema);
