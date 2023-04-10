import { Router } from "express";
import { CartManager } from '../dao/index.js';
import { ProductManager } from '../dao/index.js';
import { UserModel } from '../dao/models/user.model.js';

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
router.get("/", async (req, res) => {
    const email = req.session.user
    if (email) {

        const user = await UserModel.findOne({ email: email }).lean()
        return res.render("home", { user });
    }
    res.redirect("/login")
});

router.get("/login", (req, res) => {
    const email = req.session.user

    if (email) {
        return res.send("session ya iniciada")
    }


    res.render("login");
});

router.get("/signup", (req, res) => {
    const email = req.session.user

    if (email) {
        return res.send("session ya iniciada")
    }
    res.render("signup");
});

router.get("/perfil", async (req, res) => {

    const email = req.session.user
    if (email) {
        const user = await UserModel.findOne({ email: email }).lean()
        const rol = req.session.rol

        return res.render("perfil", { user, rol });
    }
    res.redirect("/login")
});


export default router