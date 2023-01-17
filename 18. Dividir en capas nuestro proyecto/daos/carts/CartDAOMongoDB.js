
const mongoDB = require(`../../dataBase/options/mongoDB`);

const carritoModel = require(`../../dataBase/models/cart`);
const productsModel = require(`../../dataBase/models/product`);
const userModel = require(`../../dataBase/models/user`);

const CrudMongoDB = require(`../../dataBase/containers/crudCart`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel, userModel);
    };
};

module.exports = CarritoDAOMongoDB;

