import { Router, json } from "express";
import { ProductController } from "../controller/product.controller.js";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", ProductController.getProducts);

productsRouter.post("/", ProductController.addProduct)

productsRouter.get("/realTimeProducts", ProductController.realTimeProducts)

productsRouter.get("/:pid", ProductController.getProductById)

productsRouter.delete("/:pid", ProductController.deleteProduct)

productsRouter.put("/:pid", ProductController.updateProduct)


export default productsRouter