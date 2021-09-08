const bcrypt = require("bcryptjs");
const config = require('../utils/config')
const jwt = require('jsonwebtoken');
const moment = require("moment");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
      default: ""
    },
    passwordResetExpires: {
      type: Date,
      default: moment().utcOffset(0)
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    expires: {
      type: Date,
      default: moment().utcOffset(0),
      expires: 43200
    },
    issuedAt: {
      type: Date
    },
  },
  { versionKey: false, timestamps: true }
);


UserSchema.methods.getJWT = async function () {
  const expiration_time = parseInt(config.JWT_EXPIRATION);
  const issuedAt = new Date();
  this.issuedAt = issuedAt;
  const token = jwt.sign({ userId: this.id, issuedAt }, config.JWT_ENCRYPTION, {
    expiresIn: expiration_time,
  });

  await this.save();

  return token;
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;

