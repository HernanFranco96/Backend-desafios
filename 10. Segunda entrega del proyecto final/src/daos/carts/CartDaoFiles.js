const ContainerFiles = require('../../containers/ContainerFiles');

class CartDaoFiles{
    constructor(){
        this.containerFiles = new ContainerFiles('./src/DB/carts.json')
    }

    async createCart(){
        return await this.containerFiles.createCart();
    }

    async deleteCart(id){
        return await this.containerFiles.deleteCart(id);
    }

    async getCartProducts(id){
        return await this.containerFiles.getCartProducts(id);
    }

    async addProductToCart(id, data){
        return await this.containerFiles.addProductToCart(id, data);
    }

    async deleteProductInToCart(idCart, idProd){
        return await this.containerFiles.deleteProductInToCart(idCart, idProd);
    }
}

module.exports = CartDaoFiles;