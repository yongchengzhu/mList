const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { User, VerificationToken } = require('../../models');
require('../../configs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: process.env.APP_EMAIL_USER,
      pass: process.env.APP_EMAIL_PASS,
  }
});

const handler = async event => {
  if (event.httpMethod === 'POST')
    try {
      const { email, username, password } = JSON.parse(event.body);
      const { id } = await User.create({
        email,
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        enabled: false
      });
      const { token } = await VerificationToken.create({
        expiraryDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
        token: uuidv4(),
        userId: id
      });
      const confirmation = `${event.headers.origin}/email-confirmation?token=${token}`;
      await transporter.sendMail({
        from: `"mList" <${process.env.APP_EMAIL_USER}>`,
        to: email,
        subject: 'mList Account Activation',
        html: `<p>Use this link to activate your mList account: <a href=${confirmation}>${confirmation}</a></p>`,
      });
      return { statusCode: 201 };
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
}

module.exports = { handler }
