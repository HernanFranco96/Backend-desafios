const ProductDaoFiles = require('./products/ProductDaoFiles');
const ProductDaoSqlite3 = require('./products/ProductDaoSqlite3');
const ProductDaoMongoDb = require('./products/ProductDaoMongoDb');
const ProductDaoFirebase = require('./products/ProductDaoFirebase');

const CartDaoFiles = require('./carts/CartDaoFiles');
const CartDaoSqlite3 = require('./carts/CartDaoSqlite3');
const CartDaoMongoDb = require('./carts/CartDaoMongoDb');
const CartDaoFirebase = require('./carts/CartDaoFirebase');


class Daos{
    // Archivos
    productDaoFiles(){
        return new ProductDaoFiles();
    }
    cartDaoFiles(){
        return new CartDaoFiles();
    }

    // Sqlite3
    productDaoSqlite3(){
        return new ProductDaoSqlite3();
    }
    cartDaoSqlite3(){
        return new CartDaoSqlite3();
    }

    //Mongo
    productDaoMongoDb(){
        return new ProductDaoMongoDb();
    }
    cartDaoMongoDb(){
        return new CartDaoMongoDb();
    }

    //Firebase
    productDaoFirebase(){
        return new ProductDaoFirebase();
    }
    cartDaoFirebase(){
        return new CartDaoFirebase();
    }
}

const daos = new Daos();
const products = daos.productDaoMongoDb();
const cart = daos.cartDaoMongoDb();

module.exports = { products, cart };