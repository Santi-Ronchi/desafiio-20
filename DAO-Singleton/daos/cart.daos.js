const firebase = require('firebase-admin');
const configuraciones = require('./db/segundaentrega-b078d-firebase-adminsdk-mp56f-171e64358a.json');
const ProductoModel = require('./product.daos');
const products = new ProductoModel();

let instance = null;

class Cart {
    constructor() {
        firebase.initializeApp({
            credential: firebase.credential.cert(configuraciones),
            databaseURL: 'https://segundaentrega-b078d-default-rtdb.firebaseio.com'
        })

        this.value = math.random(100);
    }

    getValue() {
        console.log(this.value);
    }

    static getInstance() {
        if (!instance) {
            instance = new Cart();
        }
        return instance;
    }

    async saveCarro(){
        const db = firebase.firestore();
        const query = db.collection('carritos');
        const newId = ((await query.get()).size) + 1;
        let today = new Date();

        try {
            const doc = query.doc();
            const newCart = await doc.create({
                id: newId,
                timestamp: today.getUTCMilliseconds(),
                products: []
            })
        return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(numero) {
        try {
            console.log('id: ' + numero);
            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(String(numero));
            const show = await doc.get();
            return show.data();

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc();
            const show = await doc.get();
            return show.data();

        } catch (error) {
            console.log(error);
        }
    }

    async addToCart(cartId, prodId) {
        try {
            console.log('Entro al carro');
            let productoDB = await products.getById(prodId);
            const carrito = await this.getById(cartId);
            
            productoDB.id = Number(productoDB.id) + 6;
            //carrito.products.push(productoDB);

            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(cartId);

            const item = await doc.update({
                products: firebase.firestore.FieldValue.arrayUnion(String(productoDB))
            })

        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(numero) {
        try {
            console.log('id: ' + numero);
            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(String(numero));
            const exterm = await doc.delete();
            return exterm;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(cartId, prodId) {
        try {
            console.log('Entro al carro');
            let productoDB = await products.getById(prodId);
            const carrito = await this.getById(cartId);
            
            productoDB.id = Number(productoDB.id) + 6;
            //carrito.products.push(productoDB);

            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(cartId);

            const item = await doc.update({
                products: firebase.firestore.FieldValue.arrayUnion(String(productoDB))
            })

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const db = firebase.firestore();
            const ref = db.collection('carritos')
            ref.onSnapshot((snapshot) => {
              snapshot.docs.forEach((doc) => {
                ref.doc(doc.id).delete()
              })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Cart;