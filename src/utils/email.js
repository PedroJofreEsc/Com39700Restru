import nodemailer from 'nodemailer'
import { option } from '../config/option.js'
import transporter from '../config/gmail.js'


//diseñar correo de recuperacion
export const sendRecoveryEmail = async (email, token) => {
    const link = `http://localhost:8080/reset-password?token=${token}`

    await transporter.sendMail({
        from: option.email.gmailEmail,
        to: email,
        subject: "restrablecer contraseña ecommerce coder",
        html: `<div>
        <h2>hemos recibido su solicitud de restablecer contraseña </h2>
        <p>haga clic aqui para restablecer contraseña </p>
        <a href=${link}>
            <button>restablecer contraseña</button>
        </a>
        </div>`
    })
}