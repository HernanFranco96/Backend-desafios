const mongoDB = require(`../../dataBase/options/mongoDB`);
const productsModel = require(`../../dataBase/models/product`);
const userModel = require(`../../dataBase/models/user`);
const ordenModel = require(`../../dataBase/models/orders`);

const CrudMongoDB = require(`../../dataBase/containers/crudOrders`);

class OrdenesDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};

module.exports = OrdenesDAOMongoDB;

