import fs from 'fs';

class CartsManager{

        constructor(path){
            this.path = path;
        }

        async getProductsOnCart(queryObject){
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

        async addProductToCart(object){
            try {     
                    const products = await this.getProductsOnCart({});
                    const idProduct = products.some((product) => product.idProductOnCart === +object.idProductOnCart)
              
                    console.log("object: ",+object.idProductOnCart);
                
                    console.log("idProduct: ",idProduct);
        
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

        async getProductFromCartById(idProduct){
            try {    
                const products = await this.getProductsOnCart({});
                const product = products.find(product => product.id === idProduct);
                return product;
            } catch (error) {
                return error;
            }
        }

}

export const cartsManager = new CartsManager('./src/carrito.json');
