const featureService = require('../services/featureService');
const logger = require('../utils/logger');

exports.createFeature = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Feature name is required.' });
        }

        const newFeature = await featureService.createFeature({ name, description });

        return res.status(201).json({
            message: 'Feature created successfully.',
            feature: newFeature,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllFeatures = async (req, res) => {
    try {
        const features = await featureService.getAll();
        return res.status(200).json({
            message: 'Features fetched successfully.',
            features: features,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getFeatureById = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await featureService.getById(id);
        return res.status(200).json(feature);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getFeatureByName = async (req, res) => {
    try {
        const { name } = req.params;
        const feature = await featureService.getFeatureByName(name); 
        return res.status(200).json(feature);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedFeature = await featureService.updateFeature(id, updatedData);

        return res.status(200).json({
            message: 'Feature updated successfully.',
            feature: updatedFeature,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeature = await featureService.deleteFeature(id);

        return res.status(200).json({
            message: 'Feature deleted successfully.',
            feature: deletedFeature,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};