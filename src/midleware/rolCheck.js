const rolCheck = (role) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(403).send({ status: "error", payload: "necesita identificarse" })
        }

        const userRole = req.user.role
        if (!role.includes(userRole)) {
            return res.status(403).send({ status: "error", payload: "no posee los permisos para acceder" })

        }
        next()

    }
}

export { rolCheck }