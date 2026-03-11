const inventoryService = require('../services/inventoryService');
const catchAsync = require('../utils/catchAsync');

exports.getAllInventory = catchAsync(async (req, res, next) => {
  const inventory = await inventoryService.getAllInventory();

  res.status(200).json({
    status: 'success',
    results: inventory.length,
    data: {
      inventory
    }
  });
});

exports.getInventoryById = catchAsync(async (req, res, next) => {
  const inventory = await inventoryService.getInventoryById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      inventory
    }
  });
});

exports.createInventoryItem = catchAsync(async (req, res, next) => {
  const newItem = await inventoryService.createInventoryItem(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      inventory: newItem
    }
  });
});

exports.updateInventoryItem = catchAsync(async (req, res, next) => {
  const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      inventory: updatedItem
    }
  });
});

exports.deleteInventoryItem = catchAsync(async (req, res, next) => {
  await inventoryService.deleteInventoryItem(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
