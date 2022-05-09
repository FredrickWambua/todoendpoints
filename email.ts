import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import SMTPConnection from 'nodemailer/lib/smtp-connection'
dotenv.config()

const configurations = {
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS:true,
    auth:{
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PSW as string

    }
}

let transporter = nodemailer.createTransport(configurations);

const mailOptions = {
    from: process.env.EMAIL as string,
    to:'fredrickswambua254@gmail.com',
    subject: 'Test email',
    text: 'This is a test email for the nodemailer understanding'
}
const emailTosend = function(){
    transporter.sendMail(mailOptions, async(error, response) =>{
        await transporter.verify()
        if(error){
            console.log(error)
        }
        console.log(response)
    })
}

export default configurations
