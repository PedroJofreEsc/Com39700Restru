import { ChatService } from "../service/chat.service.js";

class ChatController {

    static get = async (req, res) => {
        const message = await ChatService.get()
        res.render("chat", message)
        req.io.emit("", message)
    }

    static send = async (req, res, socket) => {
        try {
            const message = req.body.messages
            socket()
            res.send(sendchat)
        } catch (error) {
            res.send({ status: "error", payload: error })
        }
    }
}

export { ChatController }
