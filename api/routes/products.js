const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Success',
        id: id
    });
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'Success Update',
        id: id
    });
});

module.exports = router;