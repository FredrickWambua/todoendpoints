"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configurations = {
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSW
    }
};
let transporter = nodemailer_1.default.createTransport(configurations);
const mailOptions = {
    from: process.env.EMAIL,
    to: 'fredrickswambua254@gmail.com',
    subject: 'Test email',
    text: 'This is a test email for the nodemailer understanding'
};
const emailTosend = function () {
    transporter.sendMail(mailOptions, async (error, response) => {
        await transporter.verify();
        if (error) {
            console.log(error);
        }
        console.log(response);
    });
};
exports.default = configurations;
