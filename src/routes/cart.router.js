import { Router, json } from "express";
import { CartManager } from '../dao/index.js'

const cartsRouter = Router();
cartsRouter.use(json());

const cartManager = new CartManager
cartsRouter.get("/", async (req, res) => {
    const carts = await cartManager.getAll()

    res.status(200).send({ status: "ok", payload: carts })
});

cartsRouter.post("/", async (req, res) => {
    const result = await cartManager.create({
        product: []
    })

    res.send(result)


})

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await cartManager.getCartById(cid)
        res.status(200).send({ status: "ok", payload: cart })
    } catch (error) {
        res.status(400).send({ status: "Error", payload: error })
    }

});

cartsRouter.delete("/:cid", (req, res) => {
    const { cid } = req.params
    //deberá eliminar todos los productos del carrito
    try {
        const cart = cartManager.dropCart(cid)
        res.status(200).send({ status: "ok", payload: cart })
    } catch (error) {
        res.status(400).send({ status: "error", payload: error })
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    //agrega un stock al id del producto 
    const { cid, pid } = req.params
    try {
        const result = await cartManager.addProduct(cid, pid)

        res.status(200).send({ status: "ok", payload: result })
    } catch (error) {
        res.status(400).send({ status: "error", payload: error })
    }
})

//nuevos endpoint
cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    //deberá eliminar del carrito el producto seleccionado.

    const updateCart = await cartManager.deleteProductById(cid, pid)

    res.send(updateCart)

})

cartsRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params
    //deberá actualizar el carrito con un arreglo de productos con el formato 
    //especificado arriba.
    const cuerpo = req.body

    const updateCart = await cartManager.updateCartById(cid, cuerpo)

    res.send(updateCart)

})

cartsRouter.put("/:cid/product/:pid", (req, res) => {

    const { cid, pid } = req.params
    const { productQuantity } = { ...req.body }
    console.log(productQuantity)
    //deberá poder actualizar SÓLO la cantidad de ejemplares del producto 
    //por cualquier cantidad pasada desde req.body
    const updateCartProduct = cartManager.addProduct(cid, pid, productQuantity)

    res.send(updateCartProduct)
})



export default cartsRouter