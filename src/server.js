import express from 'express';
import handlebars from "express-handlebars";
import viewsRouter from "./router/views.router.js";
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import { productsManager } from "./ProductsManager.js";

const app = express();

const PORT = 8080;

//nodemon src/server.js
//middleware = función que se ejecuta previo al procesamiento por parte del servidor de la petición del cliente.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//creación de __dirname
app.use(express.static(__dirname+'/public'))

//handlebars
app.engine("handlebars",handlebars.engine());
app.set("view engine","handlebars");
app.set("views", __dirname + "/views");

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.`);
});

//Websocket - server
const socketServer = new Server(httpServer);


socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("crearProducto", async (product) => {
    const newProduct = await productsManager.createProduct(product);
    socket.emit("productoCreado", newProduct);
  });
});
