const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/user');

const {
  getOperations,
  getOperationById,
  createOperation,
  updateOperation,
  deleteOperation
} = require('../controllers/operation');

router.use(verifyUser);

router.get('', getOperations);
router.get('/:operationId', getOperationById);
router.post('', createOperation);
router.patch('/:operationId', updateOperation);
router.delete('/:operationId', deleteOperation);

module.exports = router;