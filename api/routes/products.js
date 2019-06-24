const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        message: 'Product Successfully Created',
        createdProduct: product
    });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Success',
        id: id
    });
});

router.put("/:productId", (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Successfully Updated',
        id: id
    });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Successfully Deleted',
        id: id
    });
});

module.exports = router;