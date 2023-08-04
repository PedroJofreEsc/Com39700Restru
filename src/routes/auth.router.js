import { Router } from "express";
import { UserModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const router = Router()
import { UserController } from "../controller/user.controller.js";
import { option } from "../config/option.js";
import jwt from "jsonwebtoken";
import UserManager from "../dao/db-managers/user.manager.js";
import { rolCheck } from "../midleware/rolCheck.js";

import { uploaderProfile } from "../utils.js";
import { checkAuthenticated } from "../midleware/checkAuthenticated.js";
const userManager = new UserManager()

//passport
router.post("/signup", uploaderProfile.single("avatar"), UserController.signUp)



router.get("/failure-singup", (req, res) => {
    res.send("no fue posible logearse")
})


router.get("/github", UserController.github)

router.get("/github-callback", UserController.githubCallback, UserController.githubCallbackNext)

router.post("/login", UserController.logIn)

router.post("/logout", UserController.logOut)

router.post("/forgot-password", UserController.forgetPass)

router.post("/reset-password", UserController.resetPass)

router.post("/premium/:uid", rolCheck(["admin"]), UserController.changePremium)

router.post("/:uid/documents", checkAuthenticated, uploaderProfile.fields([{ name: "identificacion", maxCount: 1 }, { name: "domicilio", maxCount: 1 }, { name: "estadodecuenta", maxCount: 1 }]), UserController.uploadDocuments)

//Ultima entrega 

router.get("/", UserController.getUserInfo)
router.delete("/", UserController.inactiveUser)

//router.delete("/", rolCheck(["admin"]), UserController.inactiveUser)


export default router