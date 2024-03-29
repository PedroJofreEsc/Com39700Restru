import express, { urlencoded } from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";
import ChatManager from "./dao/db-managers/chat.manager.js";
import __dirname from "./utils.js";
import cartsRouter from './routes/cart.router.js';
import productsRouter from './routes/product.router.js';
import chatRouter from "./routes/chat.router.js";
import viewRouter from './routes/view.router.js';
import AuthRouter from './routes/auth.router.js'
import mockRouter from "./routes/mock.router.js";
import { errorHandler } from "./midleware/errorHandler.js";
import { initializedPassport } from "./config/passport.config.js";
import { option } from './config/option.js'
import { addLogger } from "./utils/logger.js";
import { connectDB } from "./utils/connectDB.js";
import { swaggerSpecs } from "./config/docConfig.js";
import swaggerUI from "swagger-ui-express"

const app = express()
const port = option.server.port
const database = option.mongoDB.url

//donde ver la documentacion
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));//endpoint para ver la documentacion 


//middlewares
app.use(express.json())
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../public"));
app.use(addLogger)

//session
app.use(session({
  store: MongoStore.create({
    mongoUrl: database,
  }),
  secret: option.server.secretToken,
  resave: true,
  saveUninitialized: false
}))

//passport
initializedPassport();
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());
// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//routes
app.use("/", viewRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)
app.use("/chat", chatRouter)
app.use("/api/sessions", AuthRouter)
app.use("/api/mock", mockRouter)
app.use(errorHandler)


connectDB()
/* mongoose.connect(database)
  .then((conn) => {
    console.log("conectado a DB")
  })
 */
const httpServer = app.listen(port, () => {
  console.log("Server listening on port 8080");
});

const chatManager = new ChatManager()

const io = new Server(httpServer);
io.on("connection", (socket) => {
  socket.on("chat-message", async (data) => {
    await chatManager.create(data)
    console.log(data)
    const messages = await chatManager.getAll()
    io.emit("messages", messages)
  })

  socket.on("new-user", async (username) => {
    const messages = await chatManager.getAll()
    socket.emit("messages", messages);
    socket.broadcast.emit("new-user", username)
  })

    /* socket.on("message", (data) => {
      console.log(data);
  
      socket.emit("message", "Mensaje enviado desde el servidor!");
      // socket.broadcast.emit("message", "Mensaje broadcasteado!");
      // socketServer.emit("message", "Mensaje global!");
    });
  
    socket.on("input-changed", (data) => {
      console.log(data);
      socketServer.emit("input-changed", data);
    });
  
    socket.on("new-message", (data) => {
      messages.push({ socketId: socket.id, mensaje: data });
    });
  
    // setInterval(() => {
    //   socket.emit("message", "Información actualizada");
    // }, 1000);
   */});
//autentificacion github datos app
app.use(errorHandler)