const ContainerFirebase = require('../../containers/ContainerFirebase');

class CartDaoFirebase{
    constructor(){
        this.cartDaoFirebase = new ContainerFirebase();
    }

    async createCart(){
        return this.cartDaoFirebase.createCart();
    }

    async getAll(){
        return this.cartDaoFirebase.getAllCarts();
    }

    async getCartProducts(id){
        return this.cartDaoFirebase.getCartProducts(id);
    }

    async deleteCart(id){
        return this.cartDaoFirebase.deleteCart(id);
    }

    async addProductToCart(id, data){
        return this.cartDaoFirebase.addProductToCart(id, data);
    }

    async deleteProductInToCart(idCart, idProd){
        return this.cartDaoFirebase.deleteProductInToCart(idCart, idProd);
    }
}

module.exports = CartDaoFirebase;

