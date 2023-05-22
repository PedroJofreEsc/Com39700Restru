import { Router, json } from "express";
import { ChatController } from "../controller/chat.controller.js";
import { authenticate } from "../midleware/authenticate.js";
import { rolCheck } from "../midleware/rolCheck.js";
const chatRouter = Router()
chatRouter.use(json())

chatRouter.put("/", authenticate("authJWT"), rolCheck("user"), ChatController.send)

chatRouter.get("/", ChatController.get)

export default chatRouter