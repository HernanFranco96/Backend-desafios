const express = require('express');
const { Router } = express;
const router = Router();
const {products, cart} = require('../daos/index');

/**
 * PRODUCT ROUTES
 */
router.get('/api/productos/', (req, res) => {
    products.getAll().then(resp => res.json(resp));
});

router.get('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    products.getById(id).then(resp => res.json(resp));
});

router.post('/api/productos', (req, res) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const product = {
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock
    }
    products.addProducts(product).then(res.json({'Message': 'Product added successfully.'}));
});

router.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const product = {
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock
    }
    products.updateProduct(id, product).then(resp => res.json(resp));
});

router.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    products.deleteProduct(id).then(resp => res.json(resp));
});

/**
 * CART ROUTES
 */
router.post('/api/carrito', (req, res) => {
    cart.createCart().then(resp => res.json(resp));
});

router.get('/api/carrito', (req, res) => {
    cart.getAll().then(resp => res.json(resp));
})

router.delete('/api/carrito/:id', (req, res) => {
    const id = req.params.id;
    cart.deleteCart(id).then(resp => res.json(resp));
});

router.post('/api/carrito/:id/productos', (req, res) => {
    const id = req.params.id;
    cart.addProductToCart(id, products.getAll()).then(resp => res.json(resp));
});

router.get('/api/carrito/:id/productos', (req, res) => {
    const id = req.params.id;
    cart.getCartProducts(id).then(resp => res.json(resp));
});

router.delete('/api/carrito/:id/productos/:id_prod', (req, res) => {
    const idCart = req.params.id;
    const idProd = req.params.id_prod;
    cart.deleteProductInToCart(idCart,idProd).then(resp => res.json(resp));
});

module.exports = router;