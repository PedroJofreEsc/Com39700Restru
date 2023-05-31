import { UserService } from "../service/user.service.js";// falta agregar la parte de service
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken"

import UserManager from "../dao/db-managers/user.manager.js";
const userManager = new UserManager()
import { option } from "../config/option.js";
import { CreateUserDto, GetUserDto } from '../dao/dto/user.dto.js'

class UserController {

    static logIn = async (req, res) => {

        try {

            const { email, password } = req.body
            const user = await userManager.getUserEmail(email)

            if (user) {

                //chequear clave 
                if (isValidPassword(user, password)) {

                    const token = jwt.sign({
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role
                    },
                        option.server.secretToken, { expiresIn: "24h" });
                    return res.cookie(option.server.cookieToken, token, {
                        httpOnly: true
                    }).redirect("/products");
                } else {
                    res.status(400).send({ status: "error", payload: "clave incorrecta" })
                }

            } else {
                res.status(400).send({ status: "error", payload: "usuario no encontrado" })
            }
        }
        catch (e) {
            res.status(400).send(e)
            console.log(e.message)
        }
    }

    static signUp = async (req, res) => {
        try {
            const userDto = new CreateUserDto(req.body)

            //chequear que no exista otro correo
            const user = await userManager.getUserEmail(userDto.email)
            if (user) {
                res.send("usuario ya creado porfavor logearse")
            } else {
                let role
                const admin = new RegExp(option.admin.adminEmail)
                const isAdmin = admin.test(userDto.email)

                if (isAdmin) {
                    role = "admin"
                } else {
                    role = "user"
                }
                userDto.role = role
                userDto.password = createHash(userDto.password)

                const userCreated = await userManager.addUser(userDto)
                const token = jwt.sign({
                    _id: userCreated._id,
                    first_name: userCreated.first_name,
                    last_name: userCreated.last_name,
                    email: userCreated.email,
                    role: userCreated.role,
                }, option.server.secretToken,
                    { expiresIn: "24h" }
                )

                res.cookie(option.server.cookieToken, token, {
                    httpOnly: true
                }).send({ status: "ok", payload: userCreated })
            }
        } catch (error) {
            res.send({ staus: "error", payload: "error al registrarse" })
            console.log(error.message)
        }
    }

    static github = passport.authenticate("githubSignup", { scope: ["user:email"] }, async (req, res) => {

    })
    static githubCallback =
        passport.authenticate("githubSignup", {
            failureRedirect: "/api/sessions/failure-singup"
        })

    static githubCallbackNext = (req, res) => {
        console.log(req.session.user);
        res.send("usuario autentificado")
    }

    static logOut = async (req, res, next) => {
        res.clearCookie(option.server.cookieToken).send("cleared")
    }

}

export { UserController }