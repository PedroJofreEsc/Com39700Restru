import { Router, json } from "express";
import { ProductController } from "../controller/product.controller.js";
import { rolCheck } from "../midleware/rolCheck.js";
import { authenticate } from "../midleware/authenticate.js";
const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", authenticate("authJWT"), rolCheck("admin"), ProductController.getProducts);

productsRouter.post("/", authenticate("authJWT"), rolCheck("admin"), ProductController.addProduct)

productsRouter.get("/realTimeProducts", ProductController.realTimeProducts)

productsRouter.get("/:pid", ProductController.getProductById)

productsRouter.delete("/:pid", authenticate("authJWT"), rolCheck("admin"), ProductController.deleteProduct)

productsRouter.put("/:pid", authenticate("authJWT"), rolCheck("admin"), ProductController.updateProduct)












export default productsRouter