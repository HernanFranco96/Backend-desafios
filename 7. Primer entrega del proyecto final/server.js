const express = require('express');
const { json, urlencoded } = express;
const app = express();
const router = require('./src/moduls/routers');

const ADMINISTRADOR = true;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', router);

const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto: ${server.address().port}`);
});