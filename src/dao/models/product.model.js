import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { UserModel } from "./user.model.js";

export const ProductModel = "products"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        default: "admin"
    }
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(ProductModel, productSchema)

export default productModel