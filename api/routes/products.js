const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/products");

const router = express.Router();

/**
 * get all products
 */
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        // data: docs
        data: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              url: `http://localhost:3000/products/${doc._id}`
            }
          };
        })
      };

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
 * create a product
 */
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
      res.status(201).json({
        message: "Product Successfully Created.",
        // data: result
        data: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
 * get a product by id
 */
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .select("_id name price")
    .exec()
    .then(doc => {
      // check of doc is null
      if (doc) {
        res.status(200).json({
          data: doc,
          request: {
            type: "GET",
            description: "Get all products",
            url: `http://localhost:3000/products/`
          }
        });
      } else {
        res.status(404).json({ message: "id not found." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
 * update a product
 */
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updOps = {};

  for (const ops of req.body) {
    updOps[ops.propertyName] = ops.value;
  }

  Product.update({ _id: id }, { $set: updOps })
    .exec()
    .then(result => {
      console.log(`\n=== FROM DATABASE ===\n ${result}`);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
 * delete a product
 */
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(`\n=== FROM DATABASE ===\n ${result}`);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
