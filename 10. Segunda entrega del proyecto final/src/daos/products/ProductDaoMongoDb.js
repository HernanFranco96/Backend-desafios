const ContainerMongoDb = require('../../containers/ContainerMongoDb');

class ProductDaoMongoDb{
    constructor(){
        this.ProductDaoMongoDb = new ContainerMongoDb();
    }

    async addProducts(data){
        return this.ProductDaoMongoDb.insertProduct(data);
    }

    async getAll(){
        return this.ProductDaoMongoDb.getAllProduct();
    }

    async getById(id){
        return this.ProductDaoMongoDb.getByIdProduct(id);
    }

    async updateProduct(id, data){
        return this.ProductDaoMongoDb.updateProduct(id, data);
    }

    async deleteProduct(id){
        return this.ProductDaoMongoDb.deleteProduct(id);
    }
}

module.exports = ProductDaoMongoDb;