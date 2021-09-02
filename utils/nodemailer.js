const nodemailer = require('nodemailer');
const config = require('./config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.USER_EMAIL,
    pass: config.USER_PASSWORD
  }
});


module.exports = transporter
