import UserManager from "../dao/db-managers/user.manager.js";
import jwt from "jsonwebtoken"
import { createHash, isValidPassword } from "../utils.js";
import { option } from '../config/option.js'
import passport from "passport";
import transporter from "../config/gmail.js";
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

    static getAll = async () => {
        const users = await userManager.getAll()
        return users
    }

    static getAllInfo = async () => {
        const users = await this.getAll()
        const usersInfo = users.map(u => {
            return {
                Name: u.first_name + ' ' + u.last_name,
                Email: u.email,
                Rol: u.role,
                Id: u._id
            }
        })
        return usersInfo
    }

    static sendEmail = async (email, message, subject) => {
        const emailTemplate = message

        const contenido = await transporter.sendMail({
            from: "ecomerce backend",
            to: email,
            subject: subject,
            html: emailTemplate
        })

    }

    static getUserEmail = async (email) => {
        const user = UserManager.getUserEmail(email)
        return user
    }

    static deleteUserEmail = async (email) => {
        const user = this.getUserEmail(email)
        const deleteUser = userManager.deleteUser(user._id)
        return deleteUser
    }

    static getAllInactive = async () => {
        const users = await UserService.getAll()
        const timeUser = users.map(u => {
            return {
                id: u._id,
                first_name: u.first_name,
                last_name: u.last_name,
                LastConnection: u.last_connection,
                cart: u.cart,
                dias: Math.trunc((new Date() - u.last_connection) / 24 / 60 / 60 / 1000),
                email: u.email
            }
        })
        const oldUser = timeUser.filter(u => u.dias > 2
        )
        return oldUser
    }
    // static create = async(data)
}

export { UserService }