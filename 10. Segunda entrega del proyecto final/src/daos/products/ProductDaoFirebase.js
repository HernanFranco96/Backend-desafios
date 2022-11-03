const ContainerFirebase = require('../../containers/ContainerFirebase');

class ProductDaoFirebase{
    constructor(){
        this.productDaoFirebase = new ContainerFirebase();
    }

    async addProducts(data){
        return this.productDaoFirebase.insertProduct(data);
    }

    async getAll(){
        return this.productDaoFirebase.getAll();
    }

    async getById(id){
        return this.productDaoFirebase.getById(id);
    }

    async updateProduct(id, data){
        return this.productDaoFirebase.updateProduct(id, data);
    }

    async deleteProduct(id){
        return this.productDaoFirebase.deleteProduct(id);
    }
}

module.exports = ProductDaoFirebase;