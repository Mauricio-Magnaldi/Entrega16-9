import express from 'express';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import { __dirname } from './utils.js';

const app = express();

//creación de __dirname
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log("Escuchando el puerto 8080.");
})
