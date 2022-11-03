const ContainerSqlite3 = require('../../containers/ContainerSqlite3');
const { option } = require('../../moduls/config');
const knex = require('knex')(option.sqlite);

class ProductDaoSqlite3{
    constructor(){
        this.productDaoSqlite3 = new ContainerSqlite3('products', knex);
    }

    async createTableProducts(){
        await this.productDaoSqlite3.createTableProducts(); // Usar si la bd no esta creada
    }

    async addProducts(data){
        return await this.productDaoSqlite3.insert(data);
    }

    async getAll(){
        return await this.productDaoSqlite3.getAll();
    }

    async getById(id){
        return await this.productDaoSqlite3.getById(id);
    }

    async updateProduct(id, product){
        return await this.productDaoSqlite3.updateProduct(id, product);
    }

    async deleteProduct(id){
        return await this.productDaoSqlite3.delete(id);
    }
}

module.exports = ProductDaoSqlite3;