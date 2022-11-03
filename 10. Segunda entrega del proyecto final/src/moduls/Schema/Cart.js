const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    timestamp: {
        type: String,
        required: true,
        max: 50
    },
    products: {
        type: [String]
    }
});

module.exports = model('Cart', cartSchema);