import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

/*
POST : http://localhost:5000/api/registerMail

{
  "username" : "Farid123",
  "userEmail" "farid@mail.com",
  "text" : "",
  "subject" : " ",
}
*/

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body email
  var email = {
    body: {
      name: username,
      intro: text || 'Welcome welcome',
      outro: 'Do you need help, or do you have any questions? Just reply to this email and we would love to help you',
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || 'Signup Successful',
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({ msg: 'You should receive an email from us' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ error });
    });
};
