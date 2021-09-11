require('dotenv').config();

const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASSWORD: process.env.USER_PASSWORD,
  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  MONGO_ATLAS: process.env.MONGO_ATLAS,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_USER: process.env.MONGO_USER
};

Object.freeze(CONFIG)

module.exports = CONFIG;
