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

    updatePass = async (email, newPass) => {
        const user = UserModel.findOne({ email: email })
        const updateUser = { ...user._doc, password: newPass }
        const update = await UserModel.findOneAndUpdate({ email: email }, updateUser)
    }

    updateRol = async (id, newRol) => {
        const user = UserModel.findOne({ _id: id })
        const updateUser = { ...user._doc, role: newRol }
        const update = await UserModel.findOneAndUpdate({ _id: id }, updateUser)

    }


}