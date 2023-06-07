import winston from 'winston'
import { option } from '../config/option.js'
import __dirname from '../utils.js'
import path from "path"

const entorno = option.entorno.entorno

const loggLevels = {

    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,

}



//desarrollo
const loggDev = winston.createLogger({
    levels: loggLevels,
    transports: [
        new winston.transports.Console({ level: "debug", format: winston.format.simple() }),
        new winston.transports.File({ filename: path.join(__dirname, "logs/dev/error.log"), level: "debug" })
    ]
})
//productivo
const loggProd = winston.createLogger({
    levels: loggLevels,
    transports: [
        new winston.transports.Console({ level: "info", format: winston.format.simple() }),
        new winston.transports.File({ filename: path.join(__dirname, "logs/prod/error.log"), level: "info" })
    ]
})

//middleware

export const addLogger = (req, res, next) => {
    if (entorno === "desarrollo") {
        req.logger = loggDev
    } else if (entorno === "productivo") {
        req.logger = loggProd
    }
    req.logger.http(`${req.url} - method: ${req.method}`)
    next()
}
