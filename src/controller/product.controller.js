import { ProductService } from "../service/product.service.js";
import { CreateProductDto, GetProductDto } from "../dao/dto/products.dto.js"
class ProductController {
    static getProducts = async (req, res) => {
        const limit = req.query.limit ? req.query.limit : false
        const page = req.query.page ? req.query.page : false
        const sort = req.query.sort ? req.query.sort : false
        const query = req.query.query ? req.query.query : false


        const products = await ProductService.get()
        if (limit) {
            const limitProduct = products.splice(0, limit)
            return res.send(limitProduct)
        }
        res.send(products)
    }

    static addProduct = async (req, res) => {
        const productDto = new CreateProductDto(req.body)

        if (!productDto.title || !productDto.description || !productDto.price || !productDto.code || !productDto.stock || !productDto.category) {

            return res.status(400).send({ status: "error", payload: "falta informacion title, description, price, code, category o stock)" })
        }
        try {

            const newProduct = await ProductService.create(productDto)
            res.status(200).send({ status: "ok", payload: newProduct })

        } catch (error) {
            res.status(400).send({ status: "Error", payload: error })
        }

    }

    static getProductById = async (req, res) => {

        const { pid } = (req.params);
        try {

            const product = await ProductService.getById(pid)
            if (product) {
                res.send({ status: "ok", payload: product })
            } else {
                res.status(400).send({ status: "error", payload: "id no encontrado" })
            }
        } catch (error) {
            res.status(400).send({ stus: "eoor", payload: error })
        }
    }

    static deleteProduct = async (req, res) => {

        const { pid } = (req.params);
        try {
            const deleteProduct = await ProductService.deleteById(pid)
            res.send({ status: "ok", payload: deleteProduct })
        } catch (error) {
            res.status(400).send({ status: "error", payload: error })
        }
    }

    static updateProduct = async (req, res) => {
        const { pid } = (req.params);
        const campo = { ...req.body }
        try {
            const updateProduct = await ProductService.updateById(pid, campo)
            res.status(200).send({ status: "ok", payload: updateProduct })
        } catch (error) {
            res.status(400).send({ status: "error", payload: error })
        }
    }

    static realTimeProducts = async (req, res) => {

        const products = await ProductService.get()


        res.render("products", { products })
    }

}

export { ProductController }