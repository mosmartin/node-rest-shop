const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/products");

const router = express.Router();

// get all products
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log(`\n=== FROM DATABASE ===\n ${docs}`);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// create a product
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
      console.log(`\n=== FROM DATABASE ===\n ${result}`);

      res.status(201).json({
        message: "Product Successfully Created.",
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// get a product by id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(`\n=== FROM DB ===\n ${doc}`);

      // check of doc is null
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "id not found." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// update a product
router.put("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Successfully Updated",
    id: id
  });
});

// delete a product
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Successfully Deleted",
    id: id
  });
});

module.exports = router;
