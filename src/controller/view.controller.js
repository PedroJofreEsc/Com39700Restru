import jwt from "jsonwebtoken"
import { option } from "../config/option.js"
import { UserService } from "../service/user.service.js"
import { UserModel } from "../dao/models/user.model.js"


class viewController {

    static home = async (req, res) => {
        try {
            const token = req.cookies
            const info = jwt.verify(Object.values(token)[0], option.server.secretToken)
            console.log(info.first_name)
            const email = info.email
            const user = await UserModel.findOne({ email: email }).lean()
            return res.render("home", { user });
        } catch (error) {
            console.log(error)
            res.redirect("/login")
        }
    }

    static login = async (req, res) => {
        try {
            const token = Object.values(req.cookies)[0]
            if (token) {
                const info = jwt.verify(token, option.server.secretToken)
                const email = info.email
                const user = await UserModel.findOne({ email: email }).lean()
                return res.send("session ya iniciada")
            } else {
                res.render("login")
            }
        } catch (error) {
            console.log(error)
            res.render("/login")
        }
    }

    static perfil = async (req, res) => {
        try {
            const token = Object.values(req.cookies)[0]
            if (token) {
                const info = jwt.verify(token, option.server.secretToken)
                console.log(info.email)
                const email = info.email
                const user = await UserModel.findOne({ email: email }).lean()
                const rol = req.session.rol
                return res.render("perfil", { user, rol });

            } else {
                res.render("login")
            }
        } catch (error) {
            console.log(error)
            res.render("/login")
        }
    }
    static adminConsole = async (req, res) => {
        try {
            const token = req.cookies
            const info = jwt.verify(Object.values(token)[0], option.server.secretToken)
            console.log(info.first_name)
            res.render("adminConsole", { info })
        } catch (error) {
            console.log(error)
            res.send({ status: "error", payload: "no puede acceder a la consola" })
        }

    }

    static getUsers = async (req, res) => {
        const users = await UserService.getAllInfo()
        res.render("getusers", { users })
    }
    static deleteUser = async (req, res) => {
        const users = await UserService.getAllInactive()

        res.render("deleteuser", { users })
    }

    static changeRol = async (req, res) => {
        const users = await UserService.getAllInfo()
        console.log(users)
        res.render("changerol", { users })
    }

}

export { viewController }