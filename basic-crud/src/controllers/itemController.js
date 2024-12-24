const itemService = require('../services/itemService');
const ResponseModel = require('../utils/responseModel');

// Controller to get all items
const getAllItems = async (req, res, next) => {
    try {
        const items = await itemService.getAllItems();
        if (items.length === 0) {
            return res.status(404).json(ResponseModel.fail('No items found'));
        }
        res.status(200).json(ResponseModel.success('Items retrieved successfully', items, items.length));
    } catch (error) {
        next(error);
    }
};

// Controller to get a single item by ID
const getItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await itemService.getItemById(id);
        if (!item) {
            return res.status(404).json(ResponseModel.fail('Item not found'));
        }
        res.status(200).json(ResponseModel.success('Item retrieved successfully', item, 1));
    } catch (error) {
        next(error);
    }
};

// Controller to create a new item
const createItem = async (req, res, next) => {
    try {
        const newItem = await itemService.createItem(req.body);
        res.status(201).json(ResponseModel.success('Item created successfully', newItem, newItem.length));
    } catch (error) {
        next(error);
    }
};

// Controller to update an existing item
const updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findItem = await itemService.getItemById(id);
        if (!findItem) {
            return res.status(404).json(ResponseModel.fail('Item not found'));
        }

        const updatedItem = await itemService.updateItem(id, req.body);

        res.status(200).json(ResponseModel.success('Item updated successfully', updatedItem, updatedItem.length));
    } catch (error) {
        next(error);
    }
};

// Controller to delete an item
const deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findItem = await itemService.getItemById(id);
        if (!findItem) {
            return res.status(404).json(ResponseModel.fail('Item not found'));
        }

        const deleteItem = await itemService.deleteItem(id);
        res.status(204).json(ResponseModel.success('Item deleted successfully ', deleteItem, deleteItem.length));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};