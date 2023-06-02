import { Router, json } from "express";
import CartManager from "../dao/db-managers/cart.manager.js";
import { CartController } from "../controller/cart.controller.js";
import { authenticate } from "../midleware/authenticate.js";
import { rolCheck } from "../midleware/rolCheck.js";
const cartsRouter = Router();
cartsRouter.use(json());

const cartManager = new CartManager
cartsRouter.get("/", CartController.getCarts);

cartsRouter.post("/", CartController.createCart)

cartsRouter.get("/:cid", CartController.getCartById);

cartsRouter.delete("/:cid", CartController.dropCartyById)

cartsRouter.post("/:cid/product/:pid", authenticate("authJWT"), rolCheck("user"), CartController.putProductInCart)
cartsRouter.put("/:cid/product/:pid", authenticate("authJWT"), rolCheck("user"), CartController.updateProductInCart)

cartsRouter.delete("/:cid/product/:pid", CartController.deleteProductInCart)

cartsRouter.get("/:cid/purchase", authenticate("authJWT"), CartController.finishPurchase)

///test sin auth
//cartsRouter.post("/:cid/product/:pid", authenticate("authJWT"), CartController.putProductInCart)
//cartsRouter.put("/:cid/product/:pid", authenticate("authJWT"), CartController.updateProductInCart)

//nuevos endpoint

//cartsRouter.put("/:cid",CartController.updateCart)

export default cartsRouter