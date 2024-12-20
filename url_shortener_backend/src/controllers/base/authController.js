const planService = require('../../services/planService');
const logger = require('../../utils/logger');
const authService = require('../../services/authService');

class AuthController {
    /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
    async register(req, res, next) {
        try {
            const { email, password, planName } = req.body;
            logger.log(`email: ${email} , password: ${password}`);
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }

            const existingUser = await authService.getByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'Email already exists.' });
            }

            const plan = await planService.getPlanByName(planName || 'Free');

            if (!plan) {
                return res.status(404).json({ message: `Plan '${planName}' not found.` });
            }

            const newUser = await authService.register({ email, password }, plan.id);

            res.status(201).json({
                message: 'User created successfully.',
                user: newUser,
            });
        } catch (error) {
            logger.error('Error creating user with plan:', error);
            next(error); // Pass the error to global error handler
        }
    };

    /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const { token, user } = await authService.login(email, password);
            res.status(200).json({
                message: 'Login successful.',
                token,
                user,
            });
        } catch (error) {
            logger.error('Error during login:', error);
            next(error);
        }
    };

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await authService.getById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports = AuthController;
