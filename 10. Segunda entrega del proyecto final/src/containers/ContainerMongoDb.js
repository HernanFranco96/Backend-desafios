const mongoose = require('mongoose');
const { option } = require('../moduls/config'); 
const Product = require('../moduls/Schema/product');
const Cart = require('../moduls/Schema/cart');

class ContainerMongoDB{
    constructor(){
        this.connect();
    }

    connect(){
        try {
            mongoose.connect(option.mongo.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Database connected.');
        } catch (error) {
            return {Error: error};
        }
    }

    /* PRODUCT */

    async insertProduct(data){
        try {
            const today = new Date();
            data.timestamp = today.toLocaleString('en-GB');
            const newProduct = new Product(data);
            await newProduct.save();
            return {Message: 'Product added successfully'};
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    async getAllProduct(){
        try {
            const products = await Product.find({}, { __v: 0 }).lean();
            return products;
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    async getByIdProduct(id){
        try {
            const products = await Product.find({"_id": id});
            return products;
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    async updateProduct(id, data){
        try {
            const today = new Date();
            data.timestamp = today.toLocaleString('en-GB');
            const product = Product.find({"_id": id});
            await product.updateOne(data);
            return {Message: 'Successfully modified product.'};
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    async deleteProduct(id){
        try {
            const product = Product.find({"_id": id});
            await product.deleteOne({"_id": id});
            return {Message: 'Product removed successfully.'};
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    /* CART */

    async createCart(){
        try {
            const today = new Date();
            const date = today.toLocaleString('en-GB');
            const cart = {
                timestamp: date,
                products: []
            }
            const newCart = new Cart(cart);
            await newCart.save();
            return {Message: `Cart created: ${newCart.id}`};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }

    async getAllCart(){
        try {
            const cart = await Cart.find();
            return cart;
        } catch (error) {
            return {Error: 'Cart not found.'};
        }
    }

    async getCartProducts(id){
        try {
            const cart = await Cart.find({"_id": id});
            let newCart = '';
            for(let i in cart){
                newCart += cart[i].products;
            }
            return newCart;
        } catch (error) {
            return {Error: 'Cart not found.'};
        }
    }

    async deleteCart(id){
        try {
            const cart = Cart.find({"_id": id});
            await cart.deleteOne({"_id": id});
            return {Message: 'Cart removed successfully.'};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }

    async addProductToCart(id, data){
        try {
            const arrayProducts = await data;
            const cart = await Cart.find({"_id": id}, {_id: 0, timestamp: 0, __v: 0}).lean();
            cart.forEach(prod => prod.products.push(arrayProducts));
            let products;
            for(let i in cart){
                products = cart[i].products;
            }
            let newArray;
            products.forEach(prod => newArray=prod);
            console.log(newArray)
            await Cart.updateMany({"_id": id}, {$set: {products: newArray}});
            return {Message: 'The products were saved in the cart successfully.'};
        } catch (error) {
            return {Error: 'Failed to save products to cart'};
        }
    }

    async deleteProductInToCart(idCart, idProd){
        try {
            let index;
            const cart = await Cart.find({"_id": idCart});
            cart.forEach(prod => {
                index = prod.products.forEach(prod => console.log(prod))
            })

            await Cart.updateMany({"_id": idCart}, {$set: {products: [...newProducts]}});

            return {Message: 'Product removed from cart.'};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }
}

module.exports = ContainerMongoDB;