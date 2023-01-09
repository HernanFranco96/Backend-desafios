const fs = require('fs');

class Products {
    constructor(url){
        this.url = url;
        this.user = [];
    }

    async #readFile(){
        try{
            const content = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse(content);
        }catch(err){
            console.log(err);
        }
    }

    async addProducts(product){
        const arch = await this.#readFile();
        const today = new Date();
        const date = today.toLocaleString('en-GB');
        
        if(arch !== undefined){
            await fs.promises.writeFile(this.url, JSON.stringify([  ...arch, {...product, id: arch[arch.length - 1].id + 1, timestamp: date}], null, 2), 'utf-8');
            const newArch = await this.#readFile();
            return newArch[newArch.length - 1].id;
        }else{
            await fs.promises.writeFile(this.url, JSON.stringify([ {...product, id: 1, timestamp: date} ], null, 2), 'utf-8');
            return 1
        }
    }

    async update(id, newProduct){
        const today = new Date();
        const date = today.toLocaleString('en-GB');
        try{
            const products = await this.getAll();
            const product = products.find(product => product.id === parseInt(id));
            if(product !== undefined){
                products.splice(product, 1);
                await fs.promises.writeFile(this.url, JSON.stringify([  ...products, {...newProduct, id: parseInt(id), timestamp: date}], null, 2), 'utf-8');
                return {'Message': 'Modified product.'};    
            }
        }catch(err){
            return {'Error': err };
        }   
    }

    async deleteById(id){
        try {
            const products = await this.#readFile();
            const productsNotDeleted = products.filter(product => product.id !== parseInt(id));
            await fs.promises.writeFile(this.url, JSON.stringify(productsNotDeleted, null, 4), 'utf-8');
            return {'Message': 'Removed product.'};
        } catch (err) {
            return {'Error': err };
        }
    }

    async getAll(){
        try {
            const messages = await this.#readFile();
            return messages;
        } catch (err) {
            console.log(err);
        }
    }
}

const products = new Products('./products.json');

module.exports = products;