const nodemailer = require('nodemailer');
const config = require('./config')

const { USER_EMAIL, USER_PASSWORD, HOST } = config


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD
  }
});

transporter.forgot = function ({ user, token }) {
  this.sendMail({
    from: USER_EMAIL,
    to: user.email,
    subject: "Зміна паролю",
    text: "Some useless text",
    html: `<p>Ви отримали цей лист, тому що, ви або хтось зробив запит для зміни паролю для вашаго акаунта.\n\n Будь ласка, натисніть на посилання або вставте посілання у веб браузер щоб завершити процес:\n\n
        <a href="http://${HOST}/login/reset/${token.token}">http://${HOST}/login/reset/${token.token}</a> \n\n Якщо ви не роболи запит, то проигноруйте цей лист і ваш пароль залишиться без зміни.\n </p>`,
  })
}

transporter.reset = function ({ user }) {
  this.sendMail({
    from: USER_EMAIL,
    to: user.email,
    subject: "Ваш пароль був змінен",
    text: "Some useless text",
    html: `<p>Це підтвердження, що пароль для акаунту  ${user.email} був змінений. </p>`,
  })
}

transporter.register = function ({ user, token }) {
  this.sendMail({
    from: USER_EMAIL,
    to: user.email,
    subject: "Верифікація пошти",
    text: "Some uselss text",
    html: `<p>Будь ласка, верифікуйте ваш акаунт перейшовши за цим посиланням: 
          <a href="http://${HOST}/account/confirm/${token.token}">http://${HOST}/account/confirm/${token.token}</a> </p>`,
  })
}

module.exports = transporter
