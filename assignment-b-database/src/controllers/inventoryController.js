const inventoryService = require('../services/inventoryService');

exports.createSupplier = async (req, res, next) => {
    try {
        const data = await inventoryService.createSupplier(req.body);
        res.status(201).json({ status: 'success', data });
    } catch (error) {
        next(error);
    }
};

exports.getAllSuppliers = async (req, res, next) => {
    try {
        const data = await inventoryService.getAllSuppliers();
        res.status(200).json({
            status: 'success',
            results: data.length,
            data
        });
    } catch (error) {
        next(error);
    }
};

exports.addInventory = async (req, res, next) => {
    try {
        const data = await inventoryService.addInventory(req.body);
        res.status(201).json({ status: 'success', data });
    } catch (error) {
        next(error);
    }
};

exports.getInventory = async (req, res, next) => {
    try {
        // As per PDF: GET /inventory should return grouped and sorted data
        const data = await inventoryService.getGroupedInventory();
        res.status(200).json({
            status: 'success',
            results: data.length,
            data
        });
    } catch (error) {
        next(error);
    }
};

// Bonus: Flat list endpoint if needed
exports.getFlatInventory = async (req, res, next) => {
    try {
        const data = await inventoryService.getAllInventory();
        res.status(200).json({ status: 'success', results: data.length, data });
    } catch (error) {
        next(error);
    }
};
