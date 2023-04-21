import passport from "passport"
import LocalStrategy from "passport-local"
import GithubStrategy from "passport-github2"
import { UserModel } from "../dao/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"

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
                    first_name, last_name, email: username, age,
                    password: createHash(password)
                };
                const userCreated = await UserModel.create(newUser);
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    //login
    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        }, async (req) => { }
    )
    )

    //github login
    passport.use("githubSignup", new GithubStrategy(
        {

            clientID: "Iv1.88c829de12c3a7b0",
            clientSecret: "0de61e22cc60c139009bdf8528aabb437e743854",
            callbackURL: "http://localhost:8080/api/sessions/github-callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("profile", profile)
                const user = await UserModel.findOne({ email: profile.username });
                if (user) {
                    return done(null, user);
                }
                const newUser = {
                    email: profile.username,
                    password: createHash(profile.id)
                };
                const userCreated = await UserModel.create(newUser);
                return done(null, userCreated);
            } catch (error) {
                console.log(error)
                return done(error);
            }
        }
    )
    );
    //serializacion deserealizacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        return done(null, user);//req.user = user
    });
}

export { initializedPassport }