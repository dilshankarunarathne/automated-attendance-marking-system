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

app.use(express.json()); 

app.post('/sendmail', (req, res) => {
    let message = {
        from: 'maleeshasparrow@gmail.com', 
        to: 'user.ftp.server@gmail.com', 
        subject: 'You have attended..!', 
        html: "You have attended to the class.", 
        attachments: [ ]
    };

    transporter.sendMail(message).then((info) => {
        return res.status(201).json(
            {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        )
    }).catch((err) => {
        return res.status(500).json({ msg: err });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
