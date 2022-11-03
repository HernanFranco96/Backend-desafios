class ContainerSqlite3{
    constructor(table, knex){
        this.table = table;
        this.knex = knex;
    }

    async createTableProducts(){
        await this.knex.schema.createTable(this.table, table => {
            table.increments('id');
            table.string('nombre');
            table.string('descripcion');
            table.integer('codigo');
            table.string('foto');
            table.integer('precio');
            table.integer('stock');
            table.string('timestamp');
        })
            .then(() => console.log('Products table created successfully'))
            .catch(err => console.log(err))
    }

    async createTableCarts(){
        await this.knex.schema.createTable(this.table, table => {
            table.integer('id');
            table.string('timestamp');
            table.string('products')
        })
            .then(() => console.log('Carts table created successfully'))
            .catch(err => console.log(err))
    }

    async insert(data){
        try{
            const today = new Date();
            const date = today.toLocaleString('en-GB');
            data.timestamp = date;
            await this.knex(this.table).insert(data)
                .then(() => console.log('Product added successfully'))
                .catch(err => {return {Error: err}})
            return data.id
        }catch(error){
            return {Error: 'Product not found'};
        }

    }

    async getAll(){
        const date = [];
        await this.knex(this.table).select("*")
            .then(data => date.push(data))
            .catch(err => console.log(err))
        return date;
    }

    async getById(id){
        try {
            let product;
            await this.knex.from(this.table).where("id",id)
                .then(resp => product = resp)
                .catch(err => console.log(err))
            return product;
        } catch (error) {
            return {Error: 'Not found'};
        }
    }

    async updateProduct(id, product){
        try {
            await this.knex(this.table).where("id", id).update(product)
                .then(() => console.log('Modified product.'))
                .catch(err => console.log(err))
            return {Message: 'Modified product.'};  
        } catch (error) {
            return {Error: 'The product could not be modified.'};
        }
    }

    async delete(id){
        try {
            await this.knex(this.table).where("id", id).del()
                .then(resp => console.log(resp))
                .catch(err => console.log(err))
            return {Message: 'Deleted'};
        } catch (error) {
            return {Error: 'Failed to delete.'};
        }
    }

    /* CARTS */
    async createCart(){
        try{
            const id = Math.floor(Math.random()*500);
            const today = new Date();
            const date = today.toLocaleString('en-GB');
            const cart = {
                id: id,
                timestamp: date,
                products: []
            }
            await this.knex(this.table).insert(cart)
                .then(() => console.log('Cart created successfully.'))
                .catch(err => console.log(err))
            return id;
        }catch(e){
            return {Error: 'Failed to create cart' };
        }
    }

    async getCartProducts(id){
        try {
            return await this.knex(this.table).select("products").where("id", id);
        } catch (error) {
            return {Error: 'Product not found'}
        }
    }

    async addProductToCart(id, product){
        try{
            await product.then(resp => this.knex(this.table).where("id", id).update({"products": JSON.stringify(resp)}))
                .then(() => console.log('Product added in the cart.'))
                .catch(err => console.log(err))
            return {Message: 'Product added in the cart.'};
        }catch(e){  
            return {Error: 'Cart not found.'};
        }
    }

    async deleteProductInToCart(idCart, idProd){
        let newArray;
        try {
            const resp = await this.knex(this.table).select("products").where("id", idCart);
            const products = resp.map(element => element.products);
            const arrayProducts = JSON.parse(products);
            arrayProducts.forEach(element => (newArray = element.filter(subElement => subElement.id !== parseInt(idProd))))
            await this.knex(this.table).where("id", idCart).update({"products": JSON.stringify(newArray)});
            return {Message: 'Product deleted.'}
        } catch (error) {
            return {Error: 'Not found.'}
        }
    }
}

module.exports = ContainerSqlite3;