const mongoDB = require(`../../dataBase/options/mongoDB`);
const productsModel = require(`../../dataBase/models/product`);

const CrudMongoDB = require(`../../dataBase/containers/crudProducts`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;