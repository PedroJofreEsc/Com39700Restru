import { UserService } from "../service/user.service.js";// falta agregar la parte de service
import passport from "passport";
import { createHash, isValidPassword, generateEmailToken, validateEmailToken } from "../utils.js";
import jwt from "jsonwebtoken"
import transporter from "../config/gmail.js";
import UserManager from "../dao/db-managers/user.manager.js";
const userManager = new UserManager()
import { option } from "../config/option.js";
import { CreateUserDto, GetUserDto } from '../dao/dto/user.dto.js'
import { twilioClient, twilioPhone } from "../config/twilio.js";
import { sendRecoveryEmail } from "../utils/email.js";


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

                ////una vez creado enviar correo
                const emailTemplate = `<div>
                    <h1>Bienvenido ${userCreated.first_name} ${userCreated.last_name}  </h1>
                    <p>Ya puedes iniciar sesións con tu correo ${userCreated.email} </p>
            </div>`
                const contenido = await transporter.sendMail({
                    from: "ecomerce backend",
                    to: option.email.testEmail,
                    subject: "Registro exitoso",
                    html: emailTemplate
                })
                console.log(contenido)
                //////////////twilio
                /*const message = await twilioClient.messages.create({
                    body: `usuario creado`,
                    from: twilioPhone,
                    to:option.twilio.test
                })*/


                ////////////respuesta
                res.cookie(option.server.cookieToken, token, {
                    httpOnly: true
                }).send({ status: "ok", payload: userCreated })
            }
        } catch (error) {
            res.send({ staus: "error", payload: "error al registrarse" })
            console.log(error.message)
        }
    }

    static forgetPass = async (req, res) => {
        try {
            const { email } = req.body

            const user = userManager.getUserEmail(email)

            if (user) {
                const token = generateEmailToken(email, 10 * 60)

                await sendRecoveryEmail(email, token)

                res.send(`<div> Se envio un correo para restablecer la contraseña</div>`)
            }
            else {
                res.send(`<div> Error , <a href="/reset-password">intente de nuevo </a> </div>`)
            }

        }
        catch (error) {
            res.send(`<div> Error al resetear la contraseña, <a href="/reset-password">intente de nuevo </a> </div>`)
        }
    }

    static resetPass = async (req, res) => {
        try {
            const token = req.query.token
            const { email, password } = req.body
            //validar token
            if (validateEmailToken(token) == email) {
                const user = await UserManager.getUserEmail(email)
                //chequear si clave es la misma
                if (isValidPassword(password, user)) {
                    res.send("no puedes usar una contraseña ya utilizada")
                } else {
                    const newPass = createHash(password)
                    const update = await UserManager.updatePass(email, newPass)
                    res.render("login", { message: "contraseña actualizada" })
                }

            } else {
                return res.send(`"token invalido o vencido, genere un nuevo token <a href="/forgot-password" > resetear contraseña </a>`)
            }
        }
        catch (error) {
            res.send(error.message)
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