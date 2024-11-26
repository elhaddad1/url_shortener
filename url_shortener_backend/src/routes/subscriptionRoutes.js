const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upgrade', authenticate, subscriptionController.upgrade);

module.exports = router;
