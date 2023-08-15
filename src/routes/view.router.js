import { Router } from "express";
import CartManager from "../dao/db-managers/cart.manager.js";
import ProductManager from "../dao/db-managers/product.manager.js";
import { UserModel } from '../dao/models/user.model.js';
import { rolCheck } from "../midleware/rolCheck.js";
import { viewController } from "../controller/view.controller.js";
import { authenticate } from "../midleware/authenticate.js";

const router = Router();
const cartManager = new CartManager()
const productManager = new ProductManager()


router.get("/products", async (req, res) => {
    const products = await productManager.getAll()

    const email = req.session.user
    const user = await UserModel.findOne({ email: email }).lean()

    const rol = req.session.rol
    res.render("products", { products, user, rol })
})

router.get("/products/:pid", async (req, res) => {
    const { pid } = (req.params);
    const product = await productManager.getProductById(pid)
    console.log(product)
    res.render("productById", { product })
})

router.get("/carts", async (req, res) => {
    const carts = await cartManager.getAll()
    console.log(carts)
    res.render("carts", { carts })
});

router.get("/carts/:cid", async (req, res) => {
    const { cid } = (req.params)
    const cart = await cartManager.getCartById(cid)
    const products = cart.products
    res.render("cartById", { cart, cid, products })
});

//login view
router.get("/", viewController.home)


router.get("/login", viewController.login)


router.get("/signup", (req, res) => {
    const email = req.session.user

    if (email) {
        return res.send("session ya iniciada")
    }
    res.render("signup");
});

router.get("/perfil", viewController.perfil)


router.get("/reset-password", async (req, res) => {
    const token = req.query.token
    res.render("resetPassword", { token })

})
router.get("/restablecer", async (req, res) => {
    res.render("restablecer")

})

//entrega final
router.get("/adminconsole", viewController.adminConsole)

router.get("/adminconsole/getusers", viewController.getUsers)

router.get("/adminconsole/deleteuser", viewController.deleteUser)

router.get("/adminconsole/changerol", viewController.changeRol)

/////logger
router.get("/loggerTest", async (req, res) => {
    req.logger.debug("Nivel debug");
    req.logger.http("Nivel http");
    req.logger.info("Nivel info");
    req.logger.warning("Nivel warning");
    req.logger.error("Nivel error");
    req.logger.fatal("Nivel fatal");
    res.send("Test de Logger")
})


export default router