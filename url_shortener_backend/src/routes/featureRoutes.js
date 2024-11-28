const express = require('express');
const featureController = require('../controllers/featureController');

const router = express.Router();

router.get('/', featureController.getAllFeatures);
router.get('/:id', featureController.getFeatureById);
router.get('/name/:name', featureController.getFeatureByName);
router.post('/', featureController.createFeature);
router.put('/:id', featureController.updateFeature);
router.delete('/:id', featureController.deleteFeature);

module.exports = router;
