import { Router, json } from "express";
import { ChatController } from "../controller/chat.controller.js";
const chatRouter = Router()
chatRouter.use(json())

chatRouter.put("/", ChatController.send)

chatRouter.get("/", ChatController.get)

export default chatRouter