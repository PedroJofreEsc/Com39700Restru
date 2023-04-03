import fs from "fs"
import __dirname from "../../utils.js";

import { getNextId } from "./utils.js";
const path = __dirname + '/dao/file-managers/files/products.json'
export default class ProductManager {
    constructor() {

    }

    getAll = async () => {

        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8")

            return JSON.parse(data)
        }
        status = new error(fallo)
        return [status, data]
    }

    create = async (product) => {
        const products = await this.getAll()

        const newProduct = { product, id: getNextId(products), }

        const updateProducts = { ...products, newProduct }

        await fs.promises.writeFile(path, JSON.stringify(updateProducts))
        return updateProducts
    }

    deleteProductById = async (id) => {
        const products = await this.getAll()
        const indexProduct = products.findIndex(p => p.id === id)
        const productUpdate = products.filter(p => p.id !== id);
        if (indexProduct) {
            await fs.promises.writeFile(path, JSON.stringify(productUpdate))
            return (productUpdate)
        }
        else {
            return "ERROR: ID NO ENCONTRADA"
        }
    }


    getProductById = async (id) => {
        const products = await this.getAll()
        const product = products.find((p) => p.id === id)
        if (product) {
            return product
        } else {
            return "ERROR: ID NO ENCONTRADA"
        }
    }

    updateProduct = async (id, campo) => {
        const products = await this.getAll()
        const indexProduct = products.findIndex(p => p.id === id)
        const product = await this.getProductById(id)
        const updateProduct = { ...product, ...campo }

        const updateProductsList = products.filter(p => p.id !== id)
        updateProductsList.push(updateProduct)
        if (indexProduct) {

            await fs.promises.writeFile(path, JSON.stringify(updateProductsList))
            return updateProduct
        } else {
            return console.log('Not found')
        }
    }


}
