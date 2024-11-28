const logger = require('../utils/logger');

class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const newItem = new this.model(data);
            return await newItem.save();
        } catch (error) {
            const message = `Error creating item: ${error.message}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            const message = `Error fetching items: ${error.message}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    async getById(id) {
        try {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid ID format');
            }
            const item = await this.model.findById(id);
            if (!item) throw new Error('Item not found');
            return item;
        } catch (error) {
            const message = `Error fetching item by ID: ${error.message}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    async update(id, data) {
        try {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid ID format');
            }
            const updatedItem = await this.model.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (!updatedItem) throw new Error('Item not found');
            return updatedItem;
        } catch (error) {
            const message = `Error updating item: ${error.message}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    async delete(id) {
        try {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid ID format');
            }
            const deletedItem = await this.model.findByIdAndDelete(id);
            if (!deletedItem) throw new Error('Item not found');
            return deletedItem;
        } catch (error) {
            const message = `Error deleting item: ${error.message}`;
            logger.error(message);
            throw new Error(message);
        }
    }
}

module.exports = BaseService;