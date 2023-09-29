import { cartsManager } from "../CartsManager.js";
import { Router } from "express";

const router = Router();

router.get('/', async (request, response) => {
    try {
        const products = await cartsManager.getProductsOnCart({});
        if (!products.length) {
            response.status(200).json({mensaje: 'Carrito vacio.'});
        } else {
            const quantityProducts = products.reduce((accumulator, product) => accumulator + product.quantityProductOnCart, 0); 
            console.log(quantityProducts);
     
            response.status(200).json({mensaje: `${quantityProducts} unidades correspondientes a ${products.length} productos distintos en el carrito.`,products});
        }
    } catch (error) {
        response.status(500).json({message: error});
    }
})

router.get("/:idProduct", async (request, response) => {
    //Recibo el idProduct a buscar desde params
    const {idProduct} = request.params;
    try {
        const product = await cartsManager.getProductFromCartById(+idProduct);
        if (!product) {
            response.status(400).json({message: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        } else {
            response.status(200).json({message: 'Producto encontrado.',product});
        }
    } catch (error) {
        response.status(500).json({message: error});
    }
})

router.post("/", async (request, response) => {
    const product = request.body;
    const {idProductOnCart, quantityProductOnCart} = product;
    if (!idProductOnCart || !quantityProductOnCart) {
        return response.status(400).json({mensaje: 'Error. Sin datos suficientes.'});
    }
    try {
        const newProductOnCart = await cartsManager.addProductToCart(product);
        if(newProductOnCart.error) {
            response.status(400).json({mensaje: newProductOnCart.error});
        } else {
            response.status(200).json({mensaje: "Producto agregado al carrito.", newProductOnCart}); 
        }
    } catch (error) {
        response.status(500).json({mensaje: error});
    }
})

export default router;
