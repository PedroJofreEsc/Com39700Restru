import mongoose from "mongoose";
import { option } from "../config/option.js";
const database = option.mongoDB.url
export const connectDB = async () => {
    await mongoose.connect(database)
        .then((conn) => {
            console.log("conectado a DB")
        })

}