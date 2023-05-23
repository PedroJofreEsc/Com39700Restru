import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: string,
        required: true
    }

})

const ticketModel = mongoose.model("tickets", ticketSchema)

export default ticketModel