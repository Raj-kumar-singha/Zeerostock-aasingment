const express = require('express');
const router = express.Router();
const {
    createSupplier,
    getAllSuppliers,
    addInventory,
    getInventory,
    getFlatInventory
} = require('../controllers/inventoryController');

// Supplier Endpoints
router.post('/supplier', createSupplier);
router.get('/supplier', getAllSuppliers);

// Inventory Endpoints
router.post('/inventory', addInventory);
router.get('/inventory', getInventory);
router.get('/inventory/flat', getFlatInventory);

module.exports = router;
