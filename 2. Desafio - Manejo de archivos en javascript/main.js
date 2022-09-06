const fs = require('fs');

class Contenedor {
    constructor(url){
        this.url = url;
    }

    async #readFile(){
        try{
            const content = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse(content);
        }catch(err){
            console.log(err);
        }
    }

    async save(product){
        const products = await this.#readFile();
        if(products.length !== 0){
            await fs.promises.writeFile(this.url, JSON.stringify([  ...products, {...product, id: products[products.length - 1].id + 1 }], null, 2), 'utf-8');
            const newProducts = await this.#readFile();
            return newProducts[newProducts.length - 1].id;
        }else{
            await fs.promises.writeFile(this.url, JSON.stringify([ {...product, id: 1} ]), 'utf-8');
            return product.id;
        }  
    }

    async getAll(){
        try {
            const products = await this.#readFile();
            return products;
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id){
        try {
            const products = await this.#readFile();
            let product = products.find(product => product.id === id);
            return product;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.url,'[\n\n]');
            console.log('Archivo Eliminado.');
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id){
        try {
            const products = await this.#readFile();
            const productsNotDeleted = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.url, JSON.stringify(productsNotDeleted, null, 4), 'utf-8');
            console.log(`Producto ${id} eliminado.`);
        } catch (err) {
            console.log(err);
        }
    }
}

const producto = {
    title: 'Manzana',
    price: '6.30',
    thumbnail: './imagen/manzana.jpg'
}

const comercio = new Contenedor('productos.txt');

comercio.save(producto).then(response => console.log(`Producto con el id: ${response} agregado.`));

// comercio.deleteAll();
// comercio.deleteById(1);

setTimeout(() => {
    comercio.getAll().then(response => console.log(response));
    // comercio.getById(2).then(response => console.log(response));
}, 1000);