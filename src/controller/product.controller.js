import { ProductService } from "../service/product.service.js";
import { CreateProductDto, GetProductDto } from "../dao/dto/products.dto.js"
import { CustomError } from "../service/ErrorService/customError.service.js";
import { generateParamErrorInfo } from "../service/ErrorService/paramErrorInfo.js";
import { EError } from "../enums/EError.js";
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

    static addProduct = async (req, res, next) => {

        const productDto = await ProductService.create(req.body)

        //chequear parametros correctos
        let badParam = {}
        let expectedParam = []
        if (!productDto.title) {
            badParam.title = typeof productDto.title
            expectedParam.push("string")
        }
        if (!productDto.description) {
            badParam.title = typeof productDto.description
            expectedParam.push("string")
        }
        if (!productDto.price) {
            badParam.title = typeof productDto.price
            expectedParam.push("number")
        }
        if (!productDto.code) {
            badParam.title = typeof productDto.code
            expectedParam.push("string")
        }
        if (!productDto.stock) {
            badParam.title = typeof productDto.stock
            expectedParam.push("number")
        }
        if (!productDto.category) {
            badParam.title = typeof productDto.category
            expectedParam.push("string")
        }

        if (expectedParam.length > 0) {
            next(
                CustomError.createError({
                    name: "Product create error",
                    cause: generateParamErrorInfo(badParam, expectedParam),
                    message: "error a crear producto",
                    errorCode: EError.INVALID_JSON,
                }))

        }

        if (!productDto.title || !productDto.description || !productDto.price || !productDto.code || !productDto.stock || !productDto.category) {

            return res.status(400).send({ status: "error", payload: "falta informacion title, description, price, code, category o stock)" })
        }
        ////////////////
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

    //////mock


}

export { ProductController }