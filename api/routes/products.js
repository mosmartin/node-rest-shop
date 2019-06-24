const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/products");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products"
  });
});

router.post("/", (req, res, next) => {
  // create a product object
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  // save the product
  product
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(201).json({
    message: "Product Successfully Created.",
    data: product
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Success",
    id: id
  });
});

router.put("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Successfully Updated",
    id: id
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Successfully Deleted",
    id: id
  });
});

module.exports = router;
