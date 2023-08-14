import jwt from "jsonwebtoken"
import { option } from "../config/option.js"
import { UserService } from "../service/user.service.js"


class viewController {

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