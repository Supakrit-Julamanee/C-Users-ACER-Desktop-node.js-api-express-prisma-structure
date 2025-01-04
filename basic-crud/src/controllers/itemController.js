const itemService = require('../services/itemService');
const ResponseModel = require('../utils/responseModel');

const getAllItems = async (req, res, next) => {
    // #swagger.tags = ['Items']
    // #swagger.summary = Get all items
    try {
        const { search, page = 1, limit = 25 } = req.query;
        const items = await itemService.getAllItems(search, page, limit);
        res.status(200).json(ResponseModel.success('Items retrieved successfully', items.data, items.total));
    } catch (error) {
        next(error);
    }
};

const getItemById = async (req, res, next) => {
    // #swagger.tags = ['Items']
    // #swagger.summary = Get item by id
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


const createItem = async (req, res, next) => {
    // #swagger.tags = ['Items']
    // #swagger.summary = Create new item
    try {
        const { name, description, price } = req.body;
        const newItem = await itemService.createItem(req.body);
        res.status(201).json(ResponseModel.success('Item created successfully', newItem, newItem.length));
    } catch (error) {
        next(error);
    }
};

const updateItem = async (req, res, next) => {
    // #swagger.tags = ['Items']
    // #swagger.summary = Update item by id
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
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

const deleteItem = async (req, res, next) => {
    // #swagger.tags = ['Items']
    // #swagger.summary = Delete item by id
    try {
        const { id } = req.params;
        const findItem = await itemService.getItemById(id);
        if (!findItem) {
            return res.status(404).json(ResponseModel.fail('Item not found'));
        }

        const deleteItem = await itemService.deleteItem(id);
        res.status(200).json(ResponseModel.success('Item deleted successfully ', findItem, findItem.length));
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