const bcrypt = require("bcryptjs");
const config = require('../utils/config')
const jwt = require('jsonwebtoken');
const moment = require("moment");
moment().format();

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    passwordResetToken: { type: String, default: "" },
    passwordResetExpires: { type: Date, default: moment().utcOffset(0) },
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
    expires: { type: Date, default: moment().utcOffset(0), expires: 43200 },
    issuedAt: {
      type: Date,
    },
  },
  { usePushEach: true, versionKey: false, timestamps: true }
);


userSchema.methods.getJWT = async function () {
  const expiration_time = parseInt(config.JWT_EXPIRATION);
  const issuedAt = new Date();
  this.issuedAt = issuedAt;
  const token = jwt.sign({ userId: this.id, issuedAt }, config.JWT_ENCRYPTION, {
    expiresIn: expiration_time,
  });

  await this.save();

  return token;
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
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

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

