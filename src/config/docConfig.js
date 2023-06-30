import __dirname from '../utils.js'
import swaggerJsdoc from "swagger-jsdoc"
import { option } from './option.js'
import path from 'path'
const port = option.server.port

//crear definiciones de swagger para la documentacion 
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "pagina ecommerce",
            description: "Api rest para gestionar el backend de un ecommerce",
            version: "1.0.",
        }
    },
    apis: [`${path.join(__dirname, "/doc/**/*.yaml")} `]
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions)

console.log(path.join(__dirname, "../doc/**/*.yaml"))