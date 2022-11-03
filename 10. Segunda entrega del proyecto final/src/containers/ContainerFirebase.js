const { initializeApp } = require("firebase/app");
const { collection, doc, addDoc, getFirestore, getDocs, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCOSf6dU1Iprgq_6ZJIvshCNOV09mCKO0Q",
    authDomain: "backend-segunda-entrega-3e587.firebaseapp.com",
    projectId: "backend-segunda-entrega-3e587",
    storageBucket: "backend-segunda-entrega-3e587.appspot.com",
    messagingSenderId: "862867837438",
    appId: "1:862867837438:web:a16507439d08b81f0ab0af"
}

class ContainerFirebase{
    constructor(){
        this.db = this.connect();
    }

    connect(){
        initializeApp(firebaseConfig);
        const db = getFirestore();
        return db;
    }

    // PRODUCTS
    async insertProduct(data){
        try {
            const today = new Date();
            data.timestamp = today.toLocaleString('en-GB');
            console.log(data)
            await addDoc(collection(this.db, "products"), data);
            return {Message: 'Product added successfully'};
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    async getAll(){
        let allProducts = [];
        const products = await getDocs(collection(this.db, "products"));
        products.docs.forEach(doc => allProducts.push({ id: doc.id, ...doc.data() }));
        return allProducts;
    }

    async getById(id){
        const product = await getDoc(doc(this.db, "products", id));
        const item = [product.id, product.data()];
        return item;
    }

    async updateProduct(id, data){
        try {
            await updateDoc(doc(this.db, "products", id), data);
            return {Message: 'Successfully modified product.'};
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    async deleteProduct(id){
        try {
            await deleteDoc(doc(this.db, "products", id));
            return {Message: 'Product removed successfully.'};
        } catch (error) {
            return {Error: 'Product not found'};
        }
    }

    // CARTS
    async createCart(){
        try {
            const today = new Date();
            const date = today.toLocaleString('en-GB');
            const cart = {
                timestamp: date,
                products: []
            }
            const resp = await addDoc(collection(this.db, "carts"), cart);
            return {Message: `Cart created: ${resp.id}`};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }

    async getAllCarts(){
        const carts = await getDocs(collection(this.db, "carts"));
        let items = carts.docs.map(cart => [cart.data()]);
        return items;
    }

    async getCartProducts(id){
        const cart = await getDoc(doc(this.db, "carts", id));
        const item = [cart.id, cart.data()];
        return item;
    }

    async deleteCart(id){
        try {
            await deleteDoc(doc(this.db, "carts", id));
            return {Message: 'Cart removed successfully.'};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }

    async addProductToCart(id, data){
        try {
            const products = await data;
            await updateDoc(doc(this.db, "carts", id), {products: [...products]})
            return {Message: 'The products were saved in the cart successfully.'};
        } catch (error) {
            return {Error: 'Failed to save products to cart'};
        }
    }

    async deleteProductInToCart(idCart, idProd){
        try {
            let index;
            const item = await getDoc(doc(this.db, "carts", idCart));
            const cart = [item.data()];
            let allProducts = cart.map(prod => prod.products)
            allProducts.forEach(prod => {
                index = prod.findIndex(item => item.id == idProd)
            })
            if(index > -1){
                let totalProducts;
                allProducts.forEach(prod => {
                    totalProducts = prod.slice(0, index).concat(prod.slice(index + 1));
                })
                await updateDoc(doc(this.db, "carts", idCart), {products: [...totalProducts]})
                return {Message: 'Cart removed successfully.'};
            }
            return {Message: 'Product not found in the cart.'};
        } catch (error) {
            return {Error: 'Cart not found'};
        }
    }
}

module.exports = ContainerFirebase;