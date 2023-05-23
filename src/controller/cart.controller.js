import { CartService } from "../service/cart.service.js";
import { TicketService }
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
            try {
                const result = await CartService.create()

                res.status(200).send({ status: "ok", payload: result })
            } catch (error) {
                res.status(400).send({ status: "error", payload: error })
            }
        }
        static getCartById = async (req, res) => {
            try {
                const { cid } = req.params

                const cart = await CartService.getById(cid)
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
            const { pid } = req.params

            const cart = await CartService.getCartById(pid)
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

