const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/user');

const {
  getCategories
} = require('../controllers/category');

router.use(verifyUser);

router.get('', getCategories);

module.exports = router;