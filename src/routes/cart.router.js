import { Router, json } from "express";
import CartManager from "../dao/db-managers/cart.manager.js";
import { CartController } from "../controller/cart.controller.js";
const cartsRouter = Router();
cartsRouter.use(json());

const cartManager = new CartManager
cartsRouter.get("/", CartController.getCarts);

cartsRouter.post("/", CartController.createCart)

cartsRouter.get("/:cid", CartController.getCartById);

cartsRouter.delete("/:cid", CartController.dropCartyById)

cartsRouter.post("/:cid/product/:pid", CartController.putProductInCart)
cartsRouter.put("/:cid/product/:pid", CartController.updateProductInCart)

cartsRouter.delete("/:cid/product/:pid", CartController.deleteProductInCart)

//nuevos endpoint

//cartsRouter.put("/:cid",CartController.updateCart)

export default cartsRouter