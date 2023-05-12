import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL

const SECRET_TOKEN = process.env.SECRET_TOKEN
const COOKIE_TOKEN = process.env.COOKIE_TOKEN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const option = {

    mongoDB: {
        url: MONGO_URL,
    },
    server: {
        port: PORT,
        secretToken: SECRET_TOKEN,
        cookieToken: COOKIE_TOKEN,
    },
    admin: {
        adminEmail: ADMIN_EMAIL,
        adminPassword: ADMIN_PASSWORD
    }
}