import { ProductService } from "../service/product.service.js";

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
}

export { ProductController }