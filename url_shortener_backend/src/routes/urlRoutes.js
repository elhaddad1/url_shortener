const express = require('express');
const urlController = require('../controllers/urlController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/get', urlController.getURLs);
router.post('/shorten',  urlController.shortenUrl);  
router.get('/:slug', urlController.redirect);


module.exports = router;
