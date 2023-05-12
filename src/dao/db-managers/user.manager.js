import { UserModel } from "../models/user.model.js";

export default class UserManager {
    constructor() { }

    getUserEmail = async (email) => {
        const result = await UserModel.findOne({ email: email })
        return result
    }

    getUserId = async (id) => {
        const result = await UserModel.findOne({ _id: id })
        return result
    }

    addUser = async (data) => {
        try {
            const result = await UserModel.create(data)
            return result
        } catch (error) { return error }
    }


}