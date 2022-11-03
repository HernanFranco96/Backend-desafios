const ContainerFiles = require('../../containers/ContainerFiles');

class ProductDaoFiles{
    constructor(){
        this.containerFiles = new ContainerFiles('./src/DB/products.json')
    }

    async addProducts(data){
        return await this.containerFiles.addProducts(data);
    }

    async getAll(){
        return await this.containerFiles.getAllProducts();
    }

    async getById(id){
        return await this.containerFiles.getByIdProducts(id);
    }

    async updateProduct(id, data){
        return await this.containerFiles.updateProduct(id, data);
    }

    async deleteProduct(id){
        return await this.containerFiles.deleteProduct(id);
    }
}

module.exports = ProductDaoFiles;