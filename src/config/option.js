import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL

const SECRET_TOKEN = process.env.SECRET_TOKEN
const COOKIE_TOKEN = process.env.COOKIE_TOKEN
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const GMAIL_EMAIL = process.env.GMAIL_EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS

const TEST_EMAIL = process.env.TEST_EMAIL

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
    },
    email: {
        gmailEmail: GMAIL_EMAIL,
        emailPass: EMAIL_PASS,
        testEmail: TEST_EMAIL
    }
}