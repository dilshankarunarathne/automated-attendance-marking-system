const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
const app = express();
const port = 3001;

let config = {
    service: 'gmail',
    auth: {
        user: process.env.NODEJS_GMAIL_APP_USER,
        pass: process.env.NODEJS_GMAIL_APP_PASSWORD
    }
}

let transporter = nodemailer.createTransport(config);

function sendEmail(to, subject, html, attachments = []) {
    let message = {
        from: 'maleeshasparrow@gmail.com', 
        to: to, 
        subject: subject, 
        html: html, 
        attachments: attachments
    };

    transporter.sendMail(message).then((info) => {
        console.log("Email sent", info.messageId, nodemailer.getTestMessageUrl(info));
    }).catch((err) => {
        console.error(err);
    });
}

// sendEmail('user.ftp.server@gmail.com', 'You have attended', '<b>You have attended to class...</b>')
