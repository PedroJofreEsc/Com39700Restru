import CartManager from "../dao/db-managers/cart.manager.js";
const cartManager = new CartManager
class CartService {

    static get = async () => {
        const result = await cartManager.getAll()
        return result
    }

    static create = async () => {
        const result = await cartManager.create({ product: [] })
        return result
    }

    static getById = async (id) => {
        const result = await cartManager.getCartById(id)
        return result

    }

    static dropCart = async (id) => {
        const result = await cartManager.dropCart(id)
        return result
    }

    static addProduct = async (cid, pid) => {

        const result = await cartManager.addProduct(cid, pid)
        return result
    }

    static updateProduct = async (cid, pid, qty) => {
        const result = cartManager.addProduct(cid, pid, qty)
        return result
    }

    static deleteProduct = async (cid, pid) => {
        const result = cartManager.deleteProductById(cid, pid)
        return result
    }

    /*   static updateCart =async(cid,campo)=>{
          const result =await cartManager.updateCartBy
      } */

}

export { CartService }