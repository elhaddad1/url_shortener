const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: { type: String, default: 'free' }
});

module.exports = mongoose.model('User', UserSchema);