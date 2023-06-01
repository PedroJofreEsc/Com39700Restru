import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    console.log("middlewaree")
    switch (error.code) {
        case EError.INVALID_JSON:
            res.json({ status: "error", error: error.cause, message: error.message })
            break;
        case EError.DATABASE_ERROR:
            res.json({ status: "error", error: error.message })
            break;
        case EError.INVALID_PARAM:
            console.log("error middleware")
            res.json({ status: "error", error: error.cause })
            break;

        case EError.ROL_ERROR:
            res.json({ status: "error", error: error.cause })
            break;

        case EError.OTHER_ERROR:
            res.json({ status: "error", error: error.cause })
            break;

        default:
            res.json({ status: "error", message: "Hubo un error, contacte al equipo de soporte" })
            break;
    }
}