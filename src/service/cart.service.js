import CartManager from "../dao/db-managers/cart.manager.js";
import ProductManager from "../dao/db-managers/product.manager.js";
import { TicketManager } from "../dao/db-managers/ticket.manager.js";
const cartManager = new CartManager()
const productManager = new ProductManager()
const ticketmanager = new TicketManager()
class CartService {

    static get = async () => {
        const result = await cartManager.getAll()
        return result
    }

    static create = async () => {
        const result = await cartManager.create()
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

    static purchase = async (id, buyer) => {
        const cart = await cartManager.getCartById(id)
        if (cart) {
            console.log("purchase")
            if (cart[0].products.length > 0) {
                let buyProducts = []
                let outProducts = []
                let price = 0
                let cartIdProducts = cart[0].products.map((x) => {
                    return (x._id.valueOf());
                });
                let cartQuantity = cart[0].products.map((x) => {
                    return (x.quantity);
                });
                //obtener cantidades precio de cada articulo, no pude obtener esto con el populate  
                let products = []
                let productsQty = []
                let productPrice = []

                for (let i = 0; i < cart[0].products.length; i++) {

                    products[i] = await productManager.getProductById(cartIdProducts[i])
                    productPrice[i] = products[i].price
                    productsQty[i] = products[i].stock
                }
                for (let i = 0; i < cart[0].products.length; i++) {
                    //compro mas que el stock
                    if (productsQty[i] < cartQuantity[i]) {
                        const dif = productsQty[i]
                        productsQty[i] -= dif
                        cartQuantity[i] -= dif
                        price += dif * productPrice[i]
                        outProducts.push(cartIdProducts[i])
                    } else {//compro menos que el stock 
                        const dif = cartQuantity[i]
                        productsQty[i] -= dif
                        cartQuantity[i] -= dif
                        price += dif * productPrice[i]
                        buyProducts.push(cartIdProducts[i])
                    }
                    console.log(buyProducts, outProducts, price)
                }
                //carrito sin item
                if (!price > 0) {
                    return new Error("carro vacio")
                }

                //actualizar stock en carrito y stock
                console.log("actualizar carro")
                for (let i = 0; i < cartIdProducts.length; i++) {
                    console.log(i)
                    const updateCart = await cartManager.updateCartById(id, cartIdProducts[i], cartQuantity[i])

                    //const updateProduct = await productManager.updateQty(cartIdProducts[i], productsQty[i])

                }
                //actualizar stock
                for (let i = 0; i < outProducts.length; i++) {

                }
                //crear ticket 
                const ticket = ticketmanager.createTicket(price, buyer)
                return ticket



            } else {
                return new Error("carro vacio")
            }
        }
        else {
            return new Error("carro vacio")
        }
    }

    /*   static updateCart =async(cid,campo)=>{
          const result =await cartManager.updateCartBy
      } */

}

export { CartService }