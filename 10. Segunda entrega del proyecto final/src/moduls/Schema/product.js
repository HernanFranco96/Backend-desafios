const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        max: 20
    },
    descripcion: {
        type: String,
        required: true,
        max: 100
    },
    codigo: {
        type: Number,
        required: true
    },
    foto: {
        type: String,
        required: true,
        max: 100
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true,
        max: 20
    }
});

module.exports = model('Product', productSchema);