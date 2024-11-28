const BaseService = require('./baseService');
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

class AuthService extends BaseService {
    constructor() {
        super(UserModel);
    }

    /**
     * Registers a new user
     * @param {Object} userData - Contains user details like name, email, and password
     * @param {string} planId - The ID of the plan associated with the user
     */
    async register(userData, planId) {
        try {
            const { email, password } = userData;

            // Check if user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create the user
            const newUser = await this.createUser(email, hashedPassword, planId);
            logger.log(`User registered successfully: ${newUser.email}`);
            return newUser;
        } catch (error) {
            logger.error('Error registering user:', error);
            throw new Error('Error registering user');
        }
    }

    /**
     * Authenticates a user and returns a JWT token
     * @param {string} email - User's email
     * @param {string} password - User's password
     */
    async login(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            logger.log(`User logged in successfully: ${user.email}`);
            return { token, user };
        } catch (error) {
            logger.error('Error during login:', error);
            throw new Error('Error during login');
        }
    }

    /**
     * Verifies a JWT token
     * @param {string} token - JWT token
     */
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            logger.error('Error verifying token:', error);
            throw new Error('Invalid token');
        }
    }

    /**
     * Creates a new user with a plan
     * @param {string} email - User's email
     * @param {string} password - Hashed password
     * @param {string} planId - ID of the user's plan
     */
    async createUser(email, password, planId) {
        try {
            const newUser = new UserModel({
                email,
                password,
                plan: planId,
                subscriptionStart: new Date(),
                subscriptionEnd: new Date(), // Adjust to actual subscription logic
                createdBy: 'System',
                updatedBy: 'System',
            });

            await newUser.save();
            logger.log(`Created new user: ${email}`);
            return newUser;
        } catch (error) {
            logger.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            if (!user) throw new Error('user not found');
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by name: ${error.message}`);
        }
    }
}

module.exports = new AuthService();
