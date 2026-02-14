const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');

class InventoryService {
    /**
     * Create a new supplier
     */
    async createSupplier(data) {
        return await Supplier.create(data);
    }

    /**
     * Get all registered suppliers
     */
    async getAllSuppliers() {
        return await Supplier.find().sort({ createdAt: -1 });
    }

    /**
     * Add an item to inventory
     */
    async addInventory(data) {
        const supplier = await Supplier.findById(data.supplier_id);
        if (!supplier) {
            const error = new Error('Supplier not found');
            error.status = 404;
            throw error;
        }
        return await Inventory.create(data);
    }

    /**
     * Get all inventory items (Flat list)
     */
    async getAllInventory() {
        return await Inventory.find().populate('supplier_id', 'name city');
    }

    /**
     * Required Query: All inventory grouped by supplier
     * Sorted by total inventory value (quantity * price)
     */
    async getGroupedInventory() {
        return await Inventory.aggregate([
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'supplier_id',
                    foreignField: '_id',
                    as: 'supplier'
                }
            },
            { $unwind: '$supplier' },
            {
                $group: {
                    _id: '$supplier_id',
                    supplierName: { $first: '$supplier.name' },
                    supplierCity: { $first: '$supplier.city' },
                    inventoryItems: {
                        $push: {
                            product_name: '$product_name',
                            quantity: '$quantity',
                            price: '$price',
                            value: { $multiply: ['$quantity', '$price'] }
                        }
                    },
                    totalStockValue: { $sum: { $multiply: ['$quantity', '$price'] } }
                }
            },
            { $sort: { totalStockValue: -1 } }
        ]);
    }
}

module.exports = new InventoryService();
