export const checkAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.json({ status: "error", message: "necesitas estar autenticado" });
    }
};