import { Router, json } from "express";
import { ProductController } from "../controller/product.controller.js";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", ProductController.getProducts);

/* productsRouter.post("/", async (req, res) => {

    const { title, description, price, code, status, stock, category, thumbnails } = { ...req.body }

    if (!title || !description || !price || !code || !stock || !category) {

        return res.status(400).send({ status: "error", payload: "falta informacion title o description o price o code o category o stock)" })
    }
    try {
        const newProduct = await productManager.create({ title, description, price, code, status, stock, category, thumbnails })
        res.status(200).send({ status: "ok", payload: newProduct })

    } catch (error) {
        res.status(400).send({ status: "Error", payload: error })
    }

})


productsRouter.get("/:pid", async (req, res) => {

    const { pid } = (req.params);
    try {

        const product = await productManager.getProductById(pid)
        if (product) {
            res.send({ status: "ok", payload: product })
        } else {
            res.status(400).send({ status: "error", payload: "id no encontrado" })
        }
    } catch (error) {
        res.status(400).send({ stus: "eoor", payload: error })
    }
})

productsRouter.delete("/:pid", async (req, res) => {

    const { pid } = (req.params);
    try {
        const deleteProduct = await productManager.deleteProductById(pid)
        res.send({ status: "ok", payload: deleteProduct })
    } catch (error) {
        res.status(400).send({ status: "error", payload: error })
    }
})

productsRouter.put("/:pid", async (req, res) => {
    const { pid } = (req.params);
    const campo = { ...req.body }
    try {
        const updateProduct = await productManager.updateProduct(pid, campo)
        res.status(200).send({ status: "ok", payload: updateProduct })
    } catch (error) {
        res.status(400).send({ status: "error", payload: error })
    }
})

productsRouter.get("/real-time-products", async (req, res) => {
    const products = await productManager.getAll()
    //res.render(, { products })
})


 */

export default productsRouter