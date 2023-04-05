import { Router, json } from "express";
//import { ProductManager } from '../dao/index.js';
import { ProductManager } from "../dao/index.js";

const productsRouter = Router();
const productManager = new ProductManager
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {


    const limit = req.query.limit ? req.query.limit : false
    const page = req.query.page ? req.query.page : false
    const sort = req.query.sort ? req.query.sort : false
    const query = req.query.query ? req.query.query : false


    const products = await productManager.getAllPaginate(limit, page, sort, query);
    if (limit) {
        const limitProduct = products.splice(0, limit)
        res.send(limitProduct)
    }
    res.send(products)



});

productsRouter.post("/", async (req, res) => {

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




export default productsRouter