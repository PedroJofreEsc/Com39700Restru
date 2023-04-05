import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartSchema = new mongoose.Schema({

    products: {
        type:
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                default: 0,
            }
        }
        ,
        default: [],
    },
})

cartSchema.plugin(mongoosePaginate)
const cartModel = mongoose.model("carts", cartSchema)

export default cartModel