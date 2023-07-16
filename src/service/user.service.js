import UserManager from "../dao/db-managers/user.manager.js";
import jwt from "jsonwebtoken"
import { createHash, isValidPassword } from "../utils.js";
import { option } from '../config/option.js'
import passport from "passport";
const userManager = new UserManager()

class UserService {
    static signUp = async (email) => {
        const user = userManager.getUserId(id)
        //
        if (user) {
            return "usuario ya registrado"
        }
        else {

        }
    }

    static logIn = async (email, password) => {
        const user = await userManager.getUserEmail(email)
        if (user) {
            //chequear password
            if (isValidPassword(user, password)) {

                let rol
                const admin = option.admin.adminEmail
                const isAdmin = admin.test(email)
                if (isAdmin) {
                    rol = "admin"

                } else {
                    rol = "usuario"
                }

                const token = jwt.sign({
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                }, option.server.secretToken,
                    { expiresIn: "24h" });
                //si existe el usuario 
            }

            res.send(`Contraseña equivocada intente de nuevo <a href="/signup">crear usuario</a>`)

        } else {
            return `Usuario no registrado <a href="/signup">crear usuario</a>`
        }
        return result
    }

    // static create = async(data)
}

export { UserService }