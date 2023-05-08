import mongoose from "mongoose";
import { option } from "../config/option";

class ConnectionDB {
    static #instance;
    constructor() {
        mongoose.connect(option.mongoDB.url)
    }

    static async getInstance() {
        if (ConnectionDB.#instance) {
            return ConnectionDB.#instance
        } else {
            this.#instance = new ConnectionDB()
            console.log("conectado a la base de mongo")
            return this.#instance
        }
    }
}