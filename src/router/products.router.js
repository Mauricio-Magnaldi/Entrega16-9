import { productsManager } from "../ProductsManager.js";
import { Router } from "express";

const router = Router();

//Endpoints Productos
//Se prueba desde la extensión Thunder Client en VSC -> get -> body -> json
router.get('/', async (request, response) => {
    try {
        const products = await productsManager.getProducts({});
        if (!products.length) {
            response.status(200).json({mensaje: 'Sin productos encontrados.'});
        } else {
            response.status(200).json({mensaje: `${products.length} productos encontrados.`, products});
  //          console.log("limite ",limit)
        }
    } catch (error) {
        response.status(500).json({message: error});
    }
})

router.get("/:idProduct", async (request, response) => {
    //Recibo el idProduct a buscar desde params
    const {idProduct} = request.params;
    try {
        const product = await productsManager.getProductById(+idProduct);
        if (!product) {
            response.status(400).json({message: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        } else {
            response.status(200).json({message: 'Producto encontrado.',product});
        }
    } catch (error) {
        response.status(500).json({message: error});
    }
})

//Añadir un producto
router.post("/", async (request, response) => {
    const product = request.body;
    const {title, description, code, price, status, stock, category, thumbnails} = product;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return response.status(400).json({mensaje: 'Error de validación. No has especificado al menos un campo. Producto no agregado.'});
    }
    try {
        const newProduct = await productsManager.createProduct(product);
        if(newProduct.error) {
            response.status(400).json({mensaje: newProduct.error});
        } else {
            response.status(200).json({mensaje: "Producto creado exitosamente", newProduct}); 
        }
    } catch (error) {
        response.status(500).json({mensaje: error});
    }
})

//Eliminar un producto
router.delete('/:idProduct', async (request, response) => {
    //Recibo el idProduct a buscar desde params
    const {idProduct} = request.params;
    try {
        const product = await productsManager.deleteProduct(+idProduct);
        if (product) {
            response.status(200).json({mensaje: `Producto con id: ${idProduct} encontrado. Eliminado.`});
        } else {
            response.status(400).json({mensaje: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        }
    } catch (error) {
        response.status(500).json({mensaje: error});
    }
})

//Modificar un producto
router.put('/:idProduct', async (request, response) => {
//Recibo el idProduct a buscar desde params y por body los parámetros cuyos valores quiere actualizar.
    const {idProduct} = request.params;
    try {
        const updateProduct = await productsManager.updateProduct(+idProduct, request.body);
        if (updateProduct === -1) {
            response.status(400).json({message: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        } else {
            response.status(200).json({mensaje: `Producto con id: ${idProduct} encontrado. Modificado.`});
        }
    } catch (error) {
        response.status(500).json({message: error});
    }
})

export default router;
