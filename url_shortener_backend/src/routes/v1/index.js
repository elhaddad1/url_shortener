const express = require('express');
const urlRoutes = require('./urlRoutes'); 
const authRoutes = require('./authRoutes');
const featureRoutes = require('./featureRoutes');
const planRoutes = require('./planRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

const router = express.Router();

router.use('/url', urlRoutes); 
router.use('/auth', authRoutes); 
router.use('/feature', featureRoutes); 
router.use('/plan', planRoutes); 
router.use('/subscription', subscriptionRoutes); 

module.exports = router;