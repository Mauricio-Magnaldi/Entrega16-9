import { query } from 'express';
import fs from 'fs';

class ProductsManager{

        constructor(path){
            this.path = path;
        }

        async getProducts(queryObject){
            try{
                if(fs.existsSync(this.path)) {
                        const contenidoEnElArchivo = await fs.promises.readFile(this.path,"utf-8");
                        const contenido = JSON.parse(contenidoEnElArchivo); 
                        return contenido;
                    } else {
                        return [];
                }
            } catch (error) {
                return error;
            }
        }

        async createProduct(object){
            try {
                const products = await this.getProducts({});
                const isTitle = products.some((product) => product.title === object.title);
                if (isTitle) {
                    return  { error: `Error de validación. El producto con el titulo: ${object.title} ya existe. Producto no agregado.` };
                }        
                let id;
                if(!products.length) {
                    id = 1;
                } else {
                    id = products[products.length - 1].id+1;
                }
                const newProduct = {id, ...object};
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify (products));
                return newProduct;                            
            } catch (error) {
                return error;
            }
        }

        async getProductById(idProduct){
            try {    
                const products = await this.getProducts({});
                const product = products.find(product => product.id === idProduct);
                return product;
            } catch (error) {
                return error;
            }
        }

        async deleteProduct(idProduct){
            try {
                const products = await this.getProducts({});
                const product = products.find(product => product.id === idProduct);
                if (product) {
                    const newProducts = products.filter(product => product.id !== idProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                    return product;
                } 
            } catch (error) {
                return error;
            }
        }

        async updateProduct(idProduct, object) {
            try { 
                const products = await this.getProducts({});
                const index = products.findIndex((product) => product.id === idProduct);
                if (index === -1) {
                    return -1;
                }
                const updateProduct = products[index];
                products[index] = {...updateProduct, ...object};
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return 1;
            } catch (error) {
                return error;
            }
        }
}

export const productsManager = new ProductsManager('./src/productos.json');
