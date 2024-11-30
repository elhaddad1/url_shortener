const planService = require('../../services/planService');

class PlanController {
    async createPlan(req, res) {
        try {
            const planData = req.body;
            const newPlan = await planService.create(planData);
            return res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPlans(req, res) {
        try {
            const plans = await planService.getAll();
            return res.status(200).json(plans);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPlanById(req, res) {
        try {
            const { id } = req.params;
            const plan = await planService.getById(id);
            return res.status(200).json(plan);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getPlanByName(req, res) {
        try {
            const { name } = req.params;
            const plan = await planService.getPlanByName(name);
            return res.status(200).json(plan);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updatePlan(req, res) {
        try {
            const { id } = req.params;
            const planData = req.body;
            const updatedPlan = await planService.update(id, planData);
            return res.status(200).json({ message: 'Plan updated successfully', plan: updatedPlan });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deletePlan(req, res) {
        try {
            const { id } = req.params;
            const deletedPlan = await planService.delete(id);
            return res.status(200).json({ message: 'Plan deleted successfully', plan: deletedPlan });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlanController;
