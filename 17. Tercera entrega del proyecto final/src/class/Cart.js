const mongoose = require('mongoose');
const { option } = require('../moduls/config'); 
const cart  = require('../moduls/Schema/cart');

class Cart{
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
        } catch (err) {
            return console.log(err);
        }
    }

    async createCart(){
        const today = new Date();
        const date = today.toLocaleString('en-GB');
        const cartObj = {
            timestamp: date,
            products: []
        }
        const newCart = new cart(cartObj);
        await newCart.save();
        return newCart._id;
    }

    async getAllCart(){
        try {
            const cart = await cart.find();
            return cart;
        } catch (error) {
            return {Error: 'Cart not found.'};
        }
    }

    async getCartProducts(id){
        try {
            const cart = await cart.find({"_id": id});
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
            const cart = schemaCart.find({"_id": id});
            await cart.deleteOne({"_id": id});
            return {Message: 'Cart removed successfully.'};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }

    async addProductToCart(id, data){
        try {
            const arrayProducts = await data;
            const cart = await schemaCart.find({"_id": id}, {_id: 0, timestamp: 0, __v: 0}).lean();
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
}

module.exports = Cart;