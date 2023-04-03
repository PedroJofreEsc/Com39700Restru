import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import cartsRouter from './routes/cart.router.js';
import productsRouter from './routes/product.router.js';
import viewRouter from './routes/view.router.js';
import __dirname from "./utils.js";
const app = express()

app.use(express.json())

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//routes
app.use("/", viewRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)



mongoose.connect('mongodb+srv://coder:123asd@cluster0.ovoauzl.mongodb.net/ecommerce?retryWrites=true&w=majority')
    .then((conn) => {
        console.log("conectado a DB")
    })
app.listen(8080, () => {
    console.log("server 8080")
})