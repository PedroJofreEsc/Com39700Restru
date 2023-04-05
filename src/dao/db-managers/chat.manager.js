import chatModel from "../models/chat.model.js";

export default class ChatManager {
    constructor() { }
    getAll = async () => {
        const result = await chatModel.find().lean()
        return result

    }
    create = async (data) => {
        const newMessage = await chatModel.create(data)
        const messages = await this.getAll()
        return messages
    }

}