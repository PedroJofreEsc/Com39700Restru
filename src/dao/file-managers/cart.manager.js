import fs from "fs"

import __dirname from "../../utils.js";

import { getNextId } from "./utils.js";
const path = __dirname + '/dao/file-managers/files/carts.json'
export default class CartManager {
    constructor() {

    }

    getAll = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8")
        }
    }

    create = async (cart) => {
        const carts = await this.getAll()

        const newCart = { cart, id: getNextId(carts) }

        const updateCarts = { ...carts, newCart }

        await fs.promises.writeFile(path, JSON.stringify(updateCarts))
        return updateCarts
    }

    getCartById = async (cid) => {
        const carts = await this.getAll()
        const cart = carts.find((c) => c.cid === cid)

        if (cart) {
            return cart
        } else {
            throw new Error("carro no encontrafo");
        }

    }

    addProduct = async (cid, pid, quantity = 1) => {
        const carts = await this.getAll()
        const cart = await this.getCartById(cid)
        const indexCart = carts.findIndex((p) => p.cid === cid)
        const cartProducts = cart.products;
        const productIndex = cartProducts.findIndex((p) => p.id = productId)
        if (productIndex >= 0) {
            cartProducts[productIndex].quantity += quantity
        } else {
            cartProducts.push({
                id: productId,
                quantity: 0
            })
        }
    }
}
