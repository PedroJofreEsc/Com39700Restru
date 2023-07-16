import nodemailer from 'nodemailer'
import { option } from './option.js'

const adminEmail = option.email.gmailEmail
const adminPass = option.email.emailPass

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: adminEmail,
        pass: adminPass
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
})

export default transporter;