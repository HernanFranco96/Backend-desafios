const mongoose = require('mongoose');

const dotenv = require(`dotenv`);
dotenv.config();

const URL = process.env.MONGO_URL;

const connection = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;
