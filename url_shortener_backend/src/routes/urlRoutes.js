const express = require('express');
const urlController = require('../controllers/urlController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', urlController.getURLs);
router.post('/shorten',  urlController.shortenUrl);  
router.get('/r/:slug', urlController.redirect);
router.get('/:id', urlController.getUrlById);  
router.put('/:id', urlController.updateUrl);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;
