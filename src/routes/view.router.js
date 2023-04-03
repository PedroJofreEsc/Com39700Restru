import { Router } from "express";
import { CartManager } from '../dao/index.js';
import { ProductManager } from '../dao/index.js';

const router = Router();
const cartManager = new CartManager()
const productManager = new ProductManager()
router.get("/carts", async (req, res) => {
    const carts = cartManager.getAll
    res.render("carts", { carts })
});

router.post("/products", async (req, res) => {

})
export default router