const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /orders"
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };

  res.status(201).json({
    message: "Successfully Created an Order.",
    order: order
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  res.status(200).json({
    message: "Success",
    id: id
  });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  res.status(200).json({
    message: "Success",
    id: id
  });
});

module.exports = router;
