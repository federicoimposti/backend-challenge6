const express = require('express');
const productsRouter = express.Router();

const controller = require('../controller');

productsRouter.get("/", (req, res) => {
  const response = controller.getAll();
  res.render('pages/productsList', { products: response });
});

productsRouter.post("/", (req, res) => {
  controller.save(req.body);
  res.redirect("/");
});

module.exports = productsRouter;