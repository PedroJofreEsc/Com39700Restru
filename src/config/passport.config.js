import passport from "passport"
import LocalStrategy from "passport-local"

import { UserModel } from "../dao/models/user.model"
import { createHash, isValidPassword } from "../utils"

const initializedPassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, email, age } = req.body;
                const user = await UserModel.findOne({ email: username });

                const admin = /@coder.com/

                const isAdmin = admin.test(email)
                let rol


                if (isAdmin) {
                    rol = "admin"

                } else {
                    rol = "usuario"

                }


                if (user) {
                    return done(null, false)
                }
                //si no existe en la db
                const newUser = {
                    first_name, last_name, email, age,
                    password: createHash(password)
                };
                const userCreated = await UserModel.create(newUser);
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));
}

export { initializedPassport }