import { connectDB } from "../utils/connectDB.js";
import productModel from "../dao/models/product.model.js";

connectDB()
//agregar owner de manera masiva a los productos 
const updateProduct = async () => {
    try {

        const adminID = "64793fcb81969eab808218b7"
        const product = await productModel.updateMany({}, { $set: { owner: adminID } })
        console.log(product)
    }
    catch (error) {
        console.log(error.message)
    }
}

updateProduct()