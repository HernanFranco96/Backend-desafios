const option = {
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './src/DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mongo: {
        url: 'mongodb://localhost:27017/ecommerce'
    }  
}

module.exports = { option };