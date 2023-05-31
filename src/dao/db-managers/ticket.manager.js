import ticketModel from "../models/ticket.model.js";
import { v4 } from 'uuid'
class TicketManager {
    constructor() { }

    static getAll = async () => {
        const ticket = await ticketModel.find().lean();
        return ticket
    }
    createTicket = async (price, buyer) => {
        const date = new Date()

        const code = v4()
        const data = {
            code: code,
            purchase_datetime: date,
            amount: price,
            purchaser: buyer
        }
        const ticket = await ticketModel.create(data)
        return ticket

    }
}

export { TicketManager }