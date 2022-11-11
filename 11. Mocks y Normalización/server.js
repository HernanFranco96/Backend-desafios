const express = require('express');
const products = require('./src/class/Products');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const hbs = require('express-handlebars');
const { json, urlencoded } = express;
const router = require('./src/moduls/rutas');
const chat = require('./src/class/Chat');
const { normalizar, desnormalize } = require('./src/moduls/normalizar');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(express.static('public'))

app.engine('hbs', hbs.engine({
    extname:'.hbs',
    partialsDir: __dirname + '/src/views/partials',
    layoutsDir: __dirname + '/src/views/layouts',
    defaultLayout: 'layout.hbs'
}));

app.set('views', './src/views/partials');
app.set('view engine', 'hbs');

app.use('/', router);

const server = httpServer.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

io.on('connection', client => {
    console.log(`Usuario [${client.id}] conectado.`);

    products.getAll().then(resp => {
        if(resp.length !== 0){
            io.sockets.emit('products', JSON.stringify(resp))
            io.on('products-shown', message => {
                console.log(message);
            }
        )};
    });

    client.on('new-Message', message => {
        let messages = {};
        const newMessage = normalizar(message);
        chat.save(newMessage);
        chat.getAll().then(resp => {
            resp.forEach(message => {
                message = { post: desnormalize(message) };
            });
        });
        console.log(messages)
        io.sockets.emit('save-Message', JSON.stringify(messages));
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});