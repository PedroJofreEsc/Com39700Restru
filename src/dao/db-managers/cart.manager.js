import cartModel from "../models/cart.model.js";

export default class CartManager {
  constructor() {

  }

  getAll = async () => {
    const result = await cartModel.find().lean();

    return result;
  };

  create = async (cart) => {

    const result = cartModel.create(cart)
    return result

  }

  getCartById = async (id) => {
    const result = await cartModel.findOne({ _id: id }).lean()
    return result
  }
  //por revisar
  addProduct = async (cid, pid, quantity = 1) => {
    const cart = await cartModel.findById(cid)
    //esto funciona
    for (let index = 0; index < cart.products.length; index++) {

      if (cart.products[index]._id == pid) {
        cart.products[index].quantity = cart.products[index].quantity + quantity;
        await cart.save();
        return await cartModel.findById(cid)
      };
    }
    cart.products.push({ _id: pid, quantity: quantity });
    await cart.save();
    return cart
    //esto no funciona 
    /* const productIndex = cart.products.findIndex((p) => {
      console.log(p._id.toString())
      p._id.toString() == pid.toString()
    })
    console.log(productIndex)
    if (productIndex > 0) {
      cart.products[productIndex].quantity += 1
      await cart.save()
      return cart
    } else {
      console.log(pid)
      cart.products.push({ _id: pid, quantity: 1 })
      await cart.save()
      return cart
    } */
  }

  dropCart = async (id) => {
    const cart = await cartModel.findById(id)
    cart.products = []
    cart.save()
    return cart
  }

  deleteProductById = async (cid, pid) => {
    const cart = await cartModel.findById(cid)
    for (let index = 0; index < cart.products.length; index++) {

      if (cart.products[index]._id == pid) {
        const newProducts = cart.products
        newProducts.filter((p) => { p._id != pid })
        console.log(newProducts)
        const newCart = cartModel.findOneAndUpdate({ _id: cid }, newProducts)
        return newCart
      };
    }
  }
}