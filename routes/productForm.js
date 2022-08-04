const express = require('express');
const productFormRouter = express.Router();

const controller = require('../controller');

productFormRouter.get("/", (req, res) => {
    const response = controller.getAll();
    res.render('pages/productForm');
});

module.exports = productFormRouter;