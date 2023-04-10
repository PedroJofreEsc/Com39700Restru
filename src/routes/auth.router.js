import { Router } from "express";
import { UserModel } from '../dao/models/user.model.js';

const router = Router()

router.post("/signup", async (req, res) => {
    console.log(req.session.user)
    try {
        const { first_name, last_name, email, age, password } = req.body
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            //chequear si es admin 
            const admin = /@coder.com/

            const isAdmin = admin.test(email)
            let rol
            if (isAdmin) {
                rol = "admin"

            } else {
                rol = "usuario"

            }
            console.log(rol)
            const newUser = UserModel.create({ first_name, last_name, email, age, password })
            req.session.user = newUser.email
            req.session.rol = rol
            return res.redirect("/products")
        } res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) {
            if (user.password === password) {

                //si existe el usuario lo registramos
                req.session.user = user.email;
                let rol
                const admin = /adminCoder@coder.com,/
                const isAdmin = admin.test(email)
                if (isAdmin) {
                    rol = "admin"

                } else {
                    rol = "usuario"

                }
                req.session.rol = rol
                // res.send("usuario logueado");
                return res.redirect("/products");
            }
            res.send(`Contraseña equivocada intente de nuevo <a href="/signup">crear usuario</a>`)
        }
        res.send(`Usuario no registrado <a href="/signup">crear usuario</a>`)

    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post("/logout", async (req, res) => {
    console.log("signout")
    req.session.destroy()
    return res.redirect("/login")
})

export default router