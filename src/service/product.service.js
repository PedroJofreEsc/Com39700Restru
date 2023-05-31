import ProductManager from "../dao/db-managers/product.manager.js";

const productManager = new ProductManager()

class ProductService {
    static get = async () => {
        const products = await productManager.getAll()
        return products
    }

    static create = async (data) => {
        console.log("create")

        const result = await productManager.create(data)

        return result
    }

    static getById = async (id) => {
        const result = await productManager.getProductById(id)
        return result
    }

    static deleteById = async (id) => {
        const result = await productManager.deleteProductById(id)
        return result
    }

    static updateById = async (id, campo) => {
        const result = await productManager.updateProduct(id, campo)
    }


}


export { ProductService }