const storage = require(`../modelDAOs/factory`);

const productsStorage = storage().productos;

const getAllProductsTest = async (req, res) => {
    try {
        let allProducts = await productsStorage.getAll();
        console.log(allProducts);
        return res.json(allProducts);
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos - TEST${err}`
        });
    }
}

const addProductTest = async (req, res) => {
    try {
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.thumbnail;
        const description = req.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(req.body.codigo);
        const stock = Number(req.body.stock);

        const newProducto = {
            timestamp: date,
            nombre: `${name}`,
            descripcion: `${description}`,
            codigo: code,
            thumbnail: `${url}`,
            precio: price,
            stock: stock,
            cantidad: 0
        };

        const product = await productsStorage.save(newProducto);

        return res.status(201).json(product);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear un producto ${err}`
        });
    }
}

const deleteProductByIdTest = async (req, res) => {
    try {
        const id = req.params.id;
        await productsStorage.deleteById(id);
        return res.json(`Se eliminó de forma correcta el ID:${id}`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al borrar un producto por id ${err}`
        });
    }

}

const updateProductByIdTest = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.thumbnail;
        const description = req.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(req.body.codigo);
        const stock = Number(req.body.stock);

        await productsStorage.updateById(idProduct, name, price, url, description, date, code, stock);

        return res.status(201).json(`Se actualizó el producto `);
    } catch (err) {
        return res.status(404).json({
            error: `Error al actualizar un producto ${err}`
        });
    }
}

module.exports = {
    getAllProductsTest,
    addProductTest,
    updateProductByIdTest,
    deleteProductByIdTest
};

