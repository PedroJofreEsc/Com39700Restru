import { Router } from "express";
import { UserModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const router = Router()

//passport
router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/failure-singup"
}), async (req, res) => {
    req.session.user = req.user;
    req.session.username = req.session.user.email;
    let rol
    const admin = /@coder.com,/
    const isAdmin = admin.test(req.user)
    if (isAdmin) {
        rol = "admin"

    } else {
        rol = "usuario"
    }
    req.session.rol = rol
    res.send("usuario registrado")
})

router.get("/failure-singup", (req, res) => {
    res.send("no fue posible logearse")
})

//original
/* router.post("/signup", async (req, res) => {

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

            const newUser = {
                first_name, last_name, email, age,
                password: createHash(password)
            }
            const userCreated = UserModel.create(newUser)
            req.session.user = userCreated.email
            req.session.rol = rol
            return res.redirect("/products")
        } res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
})
*/

router.get("/github", passport.authenticate("githubSignup", { scope: ["user:email"] }, async (req, res) => {

}))

router.get("/github-callback",
    passport.authenticate("githubSignup", {
        failureRedirect: "/api/sessions/failure-singup"
    }), (req, res) => {
        console.log(req.session.user);
        res.send("usuario autentificado")
    })

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) {
            if (isValidPassword(user, password)) {

                //si existe el usuario 
                req.session.user = user.email;
                let rol
                const admin = /@coder.com,/
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

//crear vista
router.post("/forgot", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            user.password = createHash(password);
            const userUpdate = await UserModel.findOneAndUpdate({ email: user.email }, user);
            res.send("contraseña actualizada");
        } else {
            req.send("El usuario no esta registrado")
        }
    } catch (error) {
        res.send("No se pudo restaurar la contraseña")
    }
});


export default router