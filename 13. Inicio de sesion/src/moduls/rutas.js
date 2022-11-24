const express = require('express');
const { Router } = express;
const router = Router();
const passport = require('passport');
const products = require('../class/Products');
const multer = require('multer');
const path = require('path');
const { generarProducto } = require('./generarProducto');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('formulario');
});
/**
 * PRODUCTOS
 */
router.get('/productos', (req, res) => {
    products.getAll().then(date => {
        if(date.length!==0){
            date.forEach(element => res.render('productos', {element}));
        }else
            res.render('productos', {message:'No hay productos'});
    });
});
router.post('/productos', upload.single('myfile'), (req, res, next) => {
    const file = req.file;
    console.log(file)
    if(!file) {
        const err = new Error('No cargo el archivo,');
        err.httpStatusCode = 400;
        return next(err);
    }
    const { title, price } = req.body;
    const product = {
        title: title,
        price: price,
        thumbnail: file.path
    }
    products.addProdutcs(product);
    res.redirect('/');
});
router.get('/productos-test', (req, res) => {
    const allProducts = generarProducto();
    products.addProdutcs(allProducts);
    res.json(generarProducto());
});
/**
 * LOGIN
 */
router.get('/api/login', (req, res) => {
    if(req.isAuthenticated()){
        let username = req.user.username;
        res.render('formulario', {username})
    }else{
        res.render('login')
    }
})
router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/api/login',
    failureRedirect: '/api/login'
}));
/**
 * LOGOUT
 */
router.get('/api/logout', (req, res) => {
    let username = req.user.username;
    req.session.destroy(err => {
        if(err) return res.send(err);
        res.render('logout', {username});
    });
})
/**
 * REGISTRO
 */
router.get('/api/signup', (req, res) => {
    res.render('register');
})
router.post('/api/signup', passport.authenticate('signup', {
    successRedirect: '/api/login',
    failureRedirect: '/api/signup'
}));

module.exports = router;