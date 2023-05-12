import { Router } from "express";
import { UserModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const router = Router()
import { UserController } from "../controller/user.controller.js";
import { option } from "../config/option.js";
import jwt from "jsonwebtoken";
import UserManager from "../dao/db-managers/user.manager.js";
const userManager = new UserManager()

//passport
router.post("/signup", UserController.signUp)



router.get("/failure-singup", (req, res) => {
    res.send("no fue posible logearse")
})


router.get("/github", UserController.github)

router.get("/github-callback", UserController.githubCallback, UserController.githubCallbackNext)

router.post("/login", UserController.logIn)

router.post("/logout", UserController.logOut)

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