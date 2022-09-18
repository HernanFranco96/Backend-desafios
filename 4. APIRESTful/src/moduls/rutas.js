const products = require('../class/Products');
const express = require('express');
const { Router } = express;
const router = Router();

/* RUTAS */
router.get('/', (req, res) => {
    res.send(products.getAll());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(products.getById(id));
});
router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    const product = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    products.addProdutcs(product);
    res.json({'Product': product});
});
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, price, thumbnail } = req.body;
    const product = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    res.json(products.update(id, product));
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json(products.delete(id));
})

module.exports = router;