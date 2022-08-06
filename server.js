const express = require('express');
const router = require('./routes');

const messagesController = require('./controllers/messages');
const messages = new messagesController('./messages/messages.txt');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const products = [];

 io.on('connection', async function(socket) {
    console.log('Un cliente se ha conectado');

    socket.emit('products', products);
    socket.emit('messages', await messages.getAll());

    socket.on('new-message', async (data) => {
        await messages.save(data);
        io.sockets.emit('messages', await messages.getAll());
    });

    socket.on('new-product', data => {
        products.push(data);
        io.sockets.emit('products', products);
    });
});

httpServer.listen(8080, () => {
    console.log("server on port 8080");;
})
