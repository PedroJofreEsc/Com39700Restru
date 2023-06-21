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
const EMAIL_TOKEN = process.env.EMAIL_TOKEN

const TEST_EMAIL = process.env.TEST_EMAIL

const TWILIO_ID = process.env.TWILIO_ID
const TWILIO_TOKEN = process.env.TWILIO_TOKEN
const TWILIO_PHONE = process.env.TWILIO_PHONE

const TEST_TWILIO = process.env.TEST_TWILIO

const ENTORNO = process.env.ENTORNO

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
        emailToken: EMAIL_TOKEN,
        testEmail: TEST_EMAIL
    },
    twilio: {
        twilioID: TWILIO_ID,
        twilioToken: TWILIO_TOKEN,
        twilioPhone: TWILIO_PHONE,
        testTwilio: TEST_TWILIO
    },
    entorno: {
        entorno: ENTORNO
    }
}