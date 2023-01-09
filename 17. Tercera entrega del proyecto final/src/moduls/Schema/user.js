const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    idCart: {
        type: String,
        required: true
    }
});

module.exports = model('usuarios', userSchema);