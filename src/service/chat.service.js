import ChatManager from "../dao/db-managers/chat.manager.js"
const chatManager = new ChatManager
class ChatService {
    static get = async () => {
        const result = await chatManager.getAll
        return result
    }

    static send = async (data) => {

    }
}

export { ChatService }