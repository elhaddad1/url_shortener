const mongoose = require('mongoose');
const { addBaseEntity } = require('../middleware/baseEntityMiddleware');

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clicks: { type: Number, default: 0 },
});

addBaseEntity(UrlSchema, mongoose);

module.exports = mongoose.model('Url', UrlSchema);
