import { Router, json } from "express";
import ChatManager from "../dao/db-managers/chat.manager.js";


const chatManager = new ChatManager()

const chatRouter = Router()
chatRouter.use(json())

chatRouter.put("/", async (req, res, socket) => {
    try {
        const message = req.body.messages
        socket()
        res.send(sendchat)
    } catch { }
})

chatRouter.get("/", async (req, res) => {
    const message = await chatManager.getAll()
    res.render("chat", message)
    //req.io.emit("", message)
})

export default chatRouter