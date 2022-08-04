const express = require('express');
const router = express.Router();
const productFormRouter = require('./productForm');
const productsRouter = require('./products');

router.use('/', productFormRouter);
router.use('/productos', productsRouter);

module.exports = router;