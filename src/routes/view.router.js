import { Router } from "express";
import { CartManager } from '../dao/index.js';
import { ProductManager } from '../dao/index.js';

const router = Router();
const cartManager = new CartManager()
const productManager = new ProductManager()


router.get("/products", async (req, res) => {
    const products = await productManager.getAll()
    console.log(products)
    res.render("products", { products })
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


export default router