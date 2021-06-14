const express = require('express');
const router = express.Router();

const {
  getOperation,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation
} = require('../controllers/operation');

router.get('', getOperation);
router.get('/:operationId', getOperationById);
router.post('', createOperation);
router.patch('/:operationId', updateOperation);
router.delete('/:operationId', deleteOperation);

module.exports = router;