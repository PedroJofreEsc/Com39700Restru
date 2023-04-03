import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user:
    {
        type: String,
        unique: true
    },
    message: {
        type: String,
    },
})

const cartModel = mongoose.model("cart", cartSchema)

export default cartModel

