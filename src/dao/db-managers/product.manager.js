import productModel from "../models/product.model.js";

export default class ProductManager {
  constructor() {

  }

  getAll = async () => {
    const products = await productModel.find().lean();

    return products;
  };

  create = async (product) => {
    const result = await productModel.create(product)
    return result

  }

  getProductById = async (id) => {
    const result = await productModel.findOne({ _id: id }).lean()
    return result

  }

  deleteProductById = async (id) => {
    const result = await productModel.deleteOne({ _id: id })
    return result
  }

  updateProduct = async (id, campo) => {
    const update = await productModel.findOneAndUpdate({ _id: id }, campo)
    const result = await this.getProductById(id)
    return result

  }

}