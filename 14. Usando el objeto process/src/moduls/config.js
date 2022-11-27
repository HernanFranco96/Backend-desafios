require('dotenv').config();
const yargs = require('yargs/yargs')(process.argv.slice(2));
const PORT = yargs.argv._;

const option = {
    mysql:{
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './src/DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mongo: {
        url: 'mongodb://localhost:27017/ecommerce'
    },
    port: {
        PORT: PORT[0] || process.env.PORT 
    }
}

module.exports = { option };