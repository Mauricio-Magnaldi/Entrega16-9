import fs from 'fs';

class CartsManager{

        constructor(path){
            this.path = path;
        }

        async getProductsOnCart(queryObject){
            try{
                if(fs.existsSync(this.path)) {
                    const productsOnFile = await fs.promises.readFile(this.path,"utf-8");
                    const products = JSON.parse(productsOnFile);                     
                    return products;
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
                    const index = products.findIndex((product) => product.idProductOnCart === +object.idProductOnCart);
                    if ( index !== -1 ) {
                                console.log(`El producto ${products[index].idProductOnCart} ya se encuentra en el carrito.`);
                                products[index].quantityProductOnCart += +object.quantityProductOnCart;                                 
                            } else {
                                console.log(`El producto ${object.idProductOnCart} no existe en el carrito.`);
                                let id;
                                if(!products.length) {
                                        id = 1;
                                    } else {
                                        id = products[products.length - 1].id+1;
                                }
                            const newProduct = {id, ...object};
                            products.push(newProduct);
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify (products));
                    return products;                            
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
