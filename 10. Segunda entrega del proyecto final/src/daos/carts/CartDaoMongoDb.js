const ContainerMongoDb = require('../../containers/ContainerMongoDb');

class CartDaoMongoDb{
    constructor(){
        this.CartDaoMongoDb = new ContainerMongoDb();
    }

    async createCart(){
        return this.CartDaoMongoDb.createCart();
    }

    async getAll(){
        return this.CartDaoMongoDb.getAllCart();
    }

    async getCartProducts(id){
        return this.CartDaoMongoDb.getCartProducts(id);
    }

    async deleteCart(id){
        return this.CartDaoMongoDb.deleteCart(id);
    }

    async addProductToCart(id, data){
        return this.CartDaoMongoDb.addProductToCart(id, data);
    }

    async deleteProductInToCart(idCart, idProd){
        return this.CartDaoMongoDb.deleteProductInToCart(idCart, idProd);
    }
}

module.exports = CartDaoMongoDb;