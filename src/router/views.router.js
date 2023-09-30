import { Router } from "express";
import { productsManager } from "../ProductsManager.js";


const router = Router();

router.get("/home", async (request, response) => {
  const products = await productsManager.getProducts();
  response.render("home", { products });
});

router.get("/realtimeproducts", async (request, response) => {
  const products = await productsManager.getProducts();
  response.render("realTimeProducts", { products });
});

export default router;