const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ email: data.email, password: hashedPassword });
    return user;
};

exports.login = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
