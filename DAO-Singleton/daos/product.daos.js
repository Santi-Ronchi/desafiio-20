const mongoose = require('mongoose');
const schemaProd = require('./modelsMDB/schemaProd.js');


let instance = null;

class Product {
    constructor(){
        this.path = 'productos.txt'
        this.idCount = '1'
    }

    getValue() {
        console.log(this.value);
    }
    
    static getInstance() {
        if (!instance) {
            instance = new Product();
        }
        return instance;
    }

    async connectMongo(){
        try{
            const URL =
            'mongodb+srv://sronchi:asd456@cluster0.dgjch.mongodb.net/ecommerce?retryWrites=true&w=majority'
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('BASE DE DATOS ARRIBA');
        }catch(e){
            console.log(e);
        }
    }

    async save(obj){
        try{
            await this.connectMongo();
            await schemaProd.create(obj)
            mongoose.disconnect();
        }catch(e){
            console.log(e);
        }
    }

    async getById(numero) {

        try {
            await this.connectMongo();
            const show = await schemaProd.findById(numero)
            mongoose.disconnect();
            return show;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        await this.connectMongo();
        try {
            const showAll = await schemaProd.find();
            mongoose.disconnect();
            return showAll;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(numero) {
        try {
            await this.connectMongo();
            const exterminate = await schemaProd.deleteOne({id: `${numero}`})
            mongoose.disconnect();
            return exterminate;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        await this.connectMongo();
        try {
            const showAll = await schemaProd.deleteMany();
            mongoose.disconnect();
            return showAll;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(req) {

        const {name,price,url,description,code,stock} = req.body;
        const idURL = parseInt(req.params.id);
        try {
            await this.connectMongo();
            const updated = await schemaProd.updateOne({id: `${idURL}`}, {name: `${name}`, price: `${price}`, url: `${url}`, description: `${description}`, code: `${code}`, stock: `${stock}`})//, {price: `${price}`}, {url: `${url}`}, {description: `${description}`}, {code: `${code}`}, {stock: `${stock}`})
            mongoose.disconnect();
            return updated;
        } catch (error) {
            console.log(error);
        }
    }

    async getRandom() {
        const numero = Math.floor(Math.random() * 3) + 1;
        const obj = this.getById(numero).then(val => {return val});
        return obj
    }

} 


module.exports = Product;