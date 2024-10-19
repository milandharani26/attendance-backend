"use strict";
// import nodemailer from 'nodemailer'
// import models from '../models/index.js'
// export const sendEmail = async (
//     email : string, 
//     subject : string, 
//     body = {}, 
//     attachments = []
// ) => {
//     // const configuration = await models.Configuration.findOne({
//     const configuration = await models.Configuration.findOne({
//         attributes: ['email', 'password'],
//     })
//     const emailConfig = {
//         // Configure your email service here
//         service: 'gmail',
//         auth: {
//             user: configuration.email,
//             pass: configuration.password,
//         },
//     }
//     const transporter = nodemailer.createTransport(emailConfig)
//     const mailOptions = {
//         from: configuration.email,
//         to: email,
//         subject,
//         html: body,
//         attachments,
//     }
//     await transporter.sendMail(mailOptions)
//     console.log(`Email sent to ${email}`)
// }
