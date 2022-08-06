const express = require('express');
const productFormRouter = express.Router();

const controller = require('../controllers/products');

productFormRouter.get("/", (req, res) => {
    const response = controller.getAll();
    res.render('pages/productForm');
});

module.exports = productFormRouter;