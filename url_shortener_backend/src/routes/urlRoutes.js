const express = require('express');
const urlController = require('../controllers/urlController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/shorten', authenticate, urlController.shorten);
router.get('/:slug', urlController.redirect);

module.exports = router;
