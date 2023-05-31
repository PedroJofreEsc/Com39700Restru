import UserManager from "../dao/db-managers/user.manager.js"

const userManager = new UserManager()

const rolCheck = (role) => {
    return async (req, res, next) => {

        const userRole = req.user.role
        if (userRole !== role) {
            return res.status(403).send({ status: "error", payload: "no posee los permisos para acceder" })

        }
        next()

    }
}

export { rolCheck }