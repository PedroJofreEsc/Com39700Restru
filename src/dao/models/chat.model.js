import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const chatSchema = new mongoose.Schema({
    user:
    {
        type: String

    },
    message: {
        type: String,
    },
})
chatSchema.plugin(mongoosePaginate)
const chatModel = mongoose.model("messages", chatSchema)

export default chatModel

