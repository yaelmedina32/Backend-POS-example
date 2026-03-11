const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createInventoryItem);

router
  .route('/:id')
  .get(inventoryController.getInventoryById)
  .patch(inventoryController.updateInventoryItem)
  .delete(inventoryController.deleteInventoryItem);

module.exports = router;
