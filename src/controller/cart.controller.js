import { CartService } from "../service/cart.service.js";
import { TicketService } from "../service/ticket.service.js";
import { option } from "../config/option.js";
import { twilioClient, twilioPhone } from "../config/twilio.js";

class CartController {

    static getCarts = async (req, res) => {
        try {
            const carts = await CartService.get()

            res.status(200).send({ status: "ok", payload: carts })
        } catch (error) {
            res.status(400).send({ status: "error", payload: error })

        }
    }

    static createCart = async (req, res) => {
        console.log("cart controller")
        try {
            console.log("cart controller")
            const result = await CartService.create()
            console.log(result)
            res.status(200).send({ status: "ok", payload: result })
        } catch (error) {
            res.status(400).send({ status: "error", payload: error })
        }
    }
    static getCartById = async (req, res) => {
        try {
            const { cid } = req.params

            const cart = await CartService.getById(cid)
            console.log(cart)
            res.status(200).send({ status: "ok", payload: cart })
        } catch (error) {
            res.status(400).send({ status: "Error", payload: error })
        }

    }

    static dropCartyById = (req, res) => {
        const { cid } = req.params
        //deberá eliminar todos los productos del carrito
        try {
            const cart = CartService.dropCart(id)
            res.status(200).send({ status: "ok", payload: cart })
        } catch (error) {
            res.status(400).send({ status: "error", payload: error })
        }
    }

    static putProductInCart = async (req, res) => {
        //agrega un stock al id del producto 
        const { cid, pid } = req.params
        try {
            const result = await CartService.addProduct(cid, pid)

            res.status(200).send({ status: "ok", payload: result })
        } catch (error) {
            res.status(400).send({ status: "error", payload: error })
        }
    }
    static updateProductInCart = (req, res) => {

        const { cid, pid } = req.params
        const { productQuantity } = { ...req.body }
        //deberá poder actualizar SÓLO la cantidad de ejemplares del producto 
        //por cualquier cantidad pasada desde req.body
        const updateCartProduct = CartService.updateProduct(cid, pid, productQuantity)

        res.send(updateCartProduct)
    }

    static deleteProductInCart = async (req, res) => {
        const { cid, pid } = req.params
        //deberá eliminar del carrito el producto seleccionado.

        const updateCart = await CartService.deleteProduct(cid, pid)

        res.send(updateCart)

    }
    static finishPurchase = async (req, res) => {
        try {
            const { cid } = req.params

            const buyer = req.user.email


            const ticket = await CartService.purchase(cid, buyer)

            ///////twilio 
            //const message = await twilioClient.messages.create({
            //    body: `compra realizada su ticket es ${ticket.code}`,
            //    from: twilioPhone,
            //    to: option.twilio.test
            //})

            res.send({ status: "ok", payload: ticket })

        } catch (error) {
            res.status(400).send({ status: "error", payload: " error al generar la compra" })
            console.log(error)
        }
        //revisar 
    }

    /*  static updateCart = async (req, res) => {
         const { cid } = req.params
         //deberá actualizar el carrito con un arreglo de productos con el formato 
         //especificado arriba.
         const cuerpo = req.body
     
         const updateCart = await cartManager.updateCartById(cid, cuerpo)
     
         res.send(updateCart)
     
     }
  */
}


export { CartController }

