import ProductManager from "../dao/db-managers/product.manager.js";

const productManager = new ProductManager()

class ProductService {
    static get = async () => {
        const products = await productManager.getAll()
        return products
    }
}

export { ProductService }