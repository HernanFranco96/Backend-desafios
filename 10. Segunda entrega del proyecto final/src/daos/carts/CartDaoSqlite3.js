const ContainerSqlite3 = require('../../containers/ContainerSqlite3');
const { option } = require('../../moduls/config');
const knex = require('knex')(option.sqlite);

class CartDaoSqlite3{
    constructor(){
        this.CartDaoSqlite3 = new ContainerSqlite3('carts', knex);
    }

    async createTableCarts(){
        await this.CartDaoSqlite3.createTableCarts(); // Usar si la bd no esta creada
    }

    async createCart(){
        return await this.CartDaoSqlite3.createCart();
    }

    async getAll(){
        return await this.CartDaoSqlite3.getAll();
    }

    async deleteCart(id){
        return await this.CartDaoSqlite3.delete(id);
    }

    async getCartProducts(id){
        return await this.CartDaoSqlite3.getCartProducts(id);
    }

    async addProductToCart(id, data){
        return await this.CartDaoSqlite3.addProductToCart(id, data);
    }

    async deleteProductInToCart(idCart, idProd){
        return await this.CartDaoSqlite3.deleteProductInToCart(idCart, idProd)
    }
}

module.exports = CartDaoSqlite3;